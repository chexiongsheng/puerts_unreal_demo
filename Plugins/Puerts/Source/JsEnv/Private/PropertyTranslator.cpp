/*
* Tencent is pleased to support the open source community by making Puerts available.
* Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
* Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may be subject to their corresponding license terms.
* This file is subject to the terms and conditions defined in file 'LICENSE', which is part of this source code package.
*/

#include "PropertyTranslator.h"
#include "V8Utils.h"
#include "ObjectMapper.h"
#include "StructWrapper.h"
#include "ContainerWrapper.h"
#include "Engine/UserDefinedStruct.h"
#include "ExtensionMethods.h"

namespace puerts
{
//在DeclarationGenerator.cpp另有一份，因为属于两个不同的模块共享比较困难，改动需要同步改
//如果是用户自定义的蓝图结构体，它的字段名内部名会是这样：DispalyName_UniqueNameId_GUID
//其中DispalyName是用户看到的名字，这样会比较不直观，所以这里自动去掉这个后缀，便于编码
//内部字段名规则位于UE_4.XX\Engine\Source\Editor\UnrealEd\Private\Kismet2\StructureEditorUtils.cpp，FMemberVariableNameHelper类
static FString DisplayNameOfUserDefinedStructField(const FString &Name)
{
    const int32 GuidStrLen = 32;
    if (Name.Len() > GuidStrLen + 3)
    {
        const int32 UnderscoreIndex = Name.Len() - GuidStrLen - 1;
        if (TCHAR('_') == Name[UnderscoreIndex])
        {
            for (int i = UnderscoreIndex - 1; i > 0; i--)
            {
                if (TCHAR('_') == Name[i])
                {
                    return Name.Mid(0, i);
                }
            }
        }
    }
    return Name;
}

void FPropertyTranslator::Getter(v8::Local<v8::Name> Property, const v8::PropertyCallbackInfo<v8::Value>& Info)
{
    v8::Isolate* Isolate = Info.GetIsolate();
    v8::Isolate::Scope IsolateScope(Isolate);
    v8::HandleScope HandleScope(Isolate);
    v8::Local<v8::Context> Context = Isolate->GetCurrentContext();
    v8::Context::Scope ContextScope(Context);

    FPropertyTranslator* This = reinterpret_cast<FPropertyTranslator*>((v8::Local<v8::External>::Cast(Info.Data()))->Value());
    This->Getter(Isolate, Context, Info);
}

void FPropertyTranslator::Getter(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::PropertyCallbackInfo<v8::Value>& Info)
{
    if (OwnerIsClass)
    {
        UObject* Object = FV8Utils::GetUObject(Info.This());
        if (!Object)
        {
            FV8Utils::ThrowException(Isolate, "invalid object");
            return;
        }
        Info.GetReturnValue().Set(UEToJsInContainer(Isolate, Context, Object, true));
    }
    else
    {
        Info.GetReturnValue().Set(UEToJsInContainer(Isolate, Context, FV8Utils::GetPoninter(Info.This()), true));
    }
}

void FPropertyTranslator::Setter(v8::Local<v8::Name> Property, v8::Local<v8::Value> Value, const v8::PropertyCallbackInfo<void>& Info)
{
    v8::Isolate* Isolate = Info.GetIsolate();
    v8::Isolate::Scope IsolateScope(Isolate);
    v8::HandleScope HandleScope(Isolate);
    v8::Local<v8::Context> Context = Isolate->GetCurrentContext();
    v8::Context::Scope ContextScope(Context);

    FPropertyTranslator* This = reinterpret_cast<FPropertyTranslator*>((v8::Local<v8::External>::Cast(Info.Data()))->Value());
    This->Setter(Isolate, Context, Value, Info);
}

void FPropertyTranslator::Setter(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, v8::Local<v8::Value> Value, const v8::PropertyCallbackInfo<void>& Info)
{
    if (OwnerIsClass)
    {
        UObject* Object = FV8Utils::GetUObject(Info.This());
        if (!Object)
        {
            FV8Utils::ThrowException(Isolate, "invalid object");
            return;
        }
        JsToUEInContainer(Isolate, Context, Value, Object, true);
    }
    else
    {
        JsToUEInContainer(Isolate, Context, Value, FV8Utils::GetPoninter(Info.This()), true);
    }
}

void FPropertyTranslator::DelegateGetter(v8::Local<v8::Name> Property, const v8::PropertyCallbackInfo<v8::Value>& Info)
{
    v8::Isolate* Isolate = Info.GetIsolate();
    v8::Isolate::Scope IsolateScope(Isolate);
    v8::HandleScope HandleScope(Isolate);
    v8::Local<v8::Context> Context = Isolate->GetCurrentContext();
    v8::Context::Scope ContextScope(Context);

    FPropertyTranslator* PropertyTranslator = reinterpret_cast<FPropertyTranslator*>((v8::Local<v8::External>::Cast(Info.Data()))->Value());
    auto Object = FV8Utils::GetUObject(Info.This());
    auto DelegatePtr = PropertyTranslator->Property->ContainerPtrToValuePtr<void>(Object);

    Info.GetReturnValue().Set(FV8Utils::IsolateData<IObjectMapper>(Isolate)->FindOrAddDelegate(Isolate, Context, Object, PropertyTranslator->Property, DelegatePtr));
}

void  FPropertyTranslator::SetAccessor(v8::Isolate* Isolate, v8::Local<v8::FunctionTemplate> Template)
{
    if (Property->IsA<DelegatePropertyMacro>()
        || Property->IsA<MulticastDelegatePropertyMacro>()
#if ENGINE_MINOR_VERSION >= 23
        || Property->IsA<MulticastInlineDelegatePropertyMacro>()
        || Property->IsA<MulticastSparseDelegatePropertyMacro>()
#endif
        )
    {
        if (Property->GetOwnerStruct()->IsA<UClass>()) // only uobject support
        {
            Template->PrototypeTemplate()->SetAccessor(FV8Utils::InternalString(Isolate, Property->GetName()), DelegateGetter, nullptr,
                v8::External::New(Isolate, this), v8::DEFAULT, (v8::PropertyAttribute)(v8::DontDelete | v8::ReadOnly));
        }
    }
    else
    {
        auto OwnerStruct = Property->GetOwnerStruct();
        Template->PrototypeTemplate()->SetAccessor(FV8Utils::InternalString(Isolate, OwnerStruct && OwnerStruct->IsA<UUserDefinedStruct>() ? 
            DisplayNameOfUserDefinedStructField(Property->GetName()) : Property->GetName()), Getter, Setter,
            v8::External::New(Isolate, this), v8::DEFAULT, v8::DontDelete);
    }
}

class FInt32PropertyTranslator : public FPropertyTranslator
{
public:
    explicit FInt32PropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::Integer::New(Isolate, static_cast<int32>(NumericProperty->GetSignedIntPropertyValue(ValuePtr)));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        NumericProperty->SetIntPropertyValue(ValuePtr, static_cast<uint64>(Value->Int32Value(Context).ToChecked()));
    }
};

class FUInt32PropertyTranslator : public FPropertyTranslator
{
public:
    explicit FUInt32PropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::Integer::NewFromUnsigned(Isolate, static_cast<uint32>(NumericProperty->GetUnsignedIntPropertyValue(ValuePtr)));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        NumericProperty->SetIntPropertyValue(ValuePtr, static_cast<uint64>(Value->Uint32Value(Context).ToChecked()));
    }
};

class FInt64PropertyTranslator : public FPropertyTranslator
{
public:
    explicit FInt64PropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::BigInt::New(Isolate, NumericProperty->GetSignedIntPropertyValue(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        if (Value->IsBigInt())
        {
            NumericProperty->SetIntPropertyValue(ValuePtr, static_cast<int64>(Value->ToBigInt(Context).ToLocalChecked()->Int64Value()));
        }
    }
};

class FUInt64PropertyTranslator : public FPropertyTranslator
{
public:
    explicit FUInt64PropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::BigInt::NewFromUnsigned(Isolate, NumericProperty->GetUnsignedIntPropertyValue(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        if (Value->IsBigInt())
        {
            NumericProperty->SetIntPropertyValue(ValuePtr, static_cast<uint64>(Value->ToBigInt(Context).ToLocalChecked()->Uint64Value()));
        }
    }
};

class FNumberPropertyTranslator : public FPropertyTranslator
{
public:
    explicit FNumberPropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::Number::New(Isolate, NumericProperty->GetFloatingPointPropertyValue(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        NumericProperty->SetFloatingPointPropertyValue(ValuePtr, Value->NumberValue(Context).ToChecked());
    }
};

class FBooleanPropertyTranslator : public FPropertyTranslator
{
public:
    explicit FBooleanPropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::Boolean::New(Isolate, BoolProperty->GetPropertyValue(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        BoolProperty->SetPropertyValue(ValuePtr, Value->BooleanValue(Isolate));
    }
};

class FEnumPropertyTranslator : public FPropertyTranslator
{
public:
    explicit FEnumPropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::Integer::New(Isolate, static_cast<int32>(EnumProperty->GetUnderlyingProperty()->GetSignedIntPropertyValue(ValuePtr)));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        EnumProperty->GetUnderlyingProperty()->SetIntPropertyValue(ValuePtr, static_cast<uint64>(Value->Int32Value(Context).ToChecked()));
    }
};
    

class FPropertyWithDestructorReflection : public FPropertyTranslator
{
public:
    explicit FPropertyWithDestructorReflection(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    void Cleanup(void *ContainerPtr) const override { Property->DestroyValue_InContainer(ContainerPtr); }
};

    
//----------------------------string-----------------------------

class FStringPropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FStringPropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return FV8Utils::ToV8String(Isolate, StringProperty->GetPropertyValue(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        auto Str = FV8Utils::ToFString(Isolate, Value);
        //TCHAR* Str = (TCHAR*)(*(v8::String::Value(Isolate, Value)));
        StringProperty->SetPropertyValue(ValuePtr, Str);
    }
};

class FNamePropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FNamePropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return FV8Utils::ToV8String(Isolate, NameProperty->GetPropertyValue(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        NameProperty->SetPropertyValue(ValuePtr, FName(*FV8Utils::ToFString(Isolate, Value)));
    }
}; 

class FTextPropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FTextPropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return FV8Utils::ToV8String(Isolate, TextProperty->GetPropertyValue(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        TextProperty->SetPropertyValue(ValuePtr, FText::FromString(FV8Utils::ToFString(Isolate, Value)));
    }
};

//object,  class, struct
class FObjectPropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FObjectPropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        UObject* UEObject = ObjectBaseProperty->GetObjectPropertyValue(ValuePtr);

        if (!UEObject || !UEObject->IsValidLowLevelFast() || UEObject->IsPendingKill())
        {
            return v8::Undefined(Isolate);
        }
        return FV8Utils::IsolateData<IObjectMapper>(Isolate)->FindOrAdd(Isolate, Context, UEObject->GetClass(), UEObject);
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        ObjectBaseProperty->SetObjectPropertyValue(ValuePtr, FV8Utils::GetUObject(Context, Value));
    }

private:
};

class FInterfacePropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FInterfacePropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        const FScriptInterface &Interface = InterfaceProperty->GetPropertyValue(ValuePtr);

        UObject* UEObject = Interface.GetObject();
        if (!UEObject || !UEObject->IsValidLowLevelFast() || UEObject->IsPendingKill())
        {
            return v8::Undefined(Isolate);
        }
        return FV8Utils::IsolateData<IObjectMapper>(Isolate)->FindOrAdd(Isolate, Context, UEObject->GetClass(), UEObject);
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        FScriptInterface *Interface = reinterpret_cast<FScriptInterface*>(ValuePtr);
        UObject* UEObject = FV8Utils::GetUObject(Context, Value);
        Interface->SetObject(UEObject);
        Interface->SetInterface(UEObject ? UEObject->GetInterfaceAddress(InterfaceProperty->InterfaceClass) : nullptr);
    }
};

class FScriptStructPropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FScriptStructPropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty)
    {
        ScriptStruct = StructProperty->Struct;
    }

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override //还是得有个指针模式，否则不能通过obj.xx.xx直接修改struct值，倒是和性能无关，应该强制js测不许保存指针型对象的引用（从native侧进入，最后一层退出时清空？）
    {
        void *Ptr = const_cast<void *>(ValuePtr);
        if (!PassByPointer)
        {
            Ptr = FScriptStructWrapper::Alloc(ScriptStruct);
            StructProperty->InitializeValue(Ptr);
            StructProperty->CopySingleValue(Ptr, ValuePtr);
        }
        return FV8Utils::IsolateData<IObjectMapper>(Isolate)->FindOrAddStruct(Isolate, Context, ScriptStruct, Ptr, PassByPointer);
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        FArrayBuffer ArrayBuffer;
        void * Ptr = nullptr;
        if (Value->IsArrayBufferView())
        {
            v8::Local<v8::ArrayBufferView> BuffView = Value.As<v8::ArrayBufferView>();
            auto ABC = BuffView->Buffer()->GetContents();
            ArrayBuffer.Data = static_cast<char*>(ABC.Data()) + BuffView->ByteOffset();
            ArrayBuffer.Length = BuffView->ByteLength();
            Ptr = &ArrayBuffer;
        }
        else if (Value->IsArrayBuffer())
        {
            auto Ab = v8::Local <v8::ArrayBuffer>::Cast(Value);
            ArrayBuffer.Data = Ab->GetContents().Data();
            ArrayBuffer.Length = Ab->ByteLength();
            Ptr = &ArrayBuffer;
        }
        else
        {
            Ptr = FV8Utils::GetPoninter(Context, Value);
        }

        if (Ptr)
        {
            StructProperty->CopySingleValue(ValuePtr, Ptr);
        }
        else if (Value->IsObject())
        {
            FV8Utils::IsolateData<IObjectMapper>(Isolate)->Merge(Isolate, Context, Value->ToObject(Context).ToLocalChecked(), ScriptStruct, ValuePtr);
        }
    }

private:
    UScriptStruct *ScriptStruct;
};

class FClassPropertyTranslator : public FObjectPropertyTranslator
{
public:
    explicit FClassPropertyTranslator(PropertyMacro *InProperty) : FObjectPropertyTranslator(InProperty) 
    {
        if (auto SoftClassProperty = CastFieldMacro<SoftClassPropertyMacro>(InProperty))
        {
            MetaClass = SoftClassProperty->MetaClass;
        }
        else if (auto ClassProperty = CastFieldMacro<ClassPropertyMacro>(InProperty))
        {
            MetaClass = ClassProperty->MetaClass;
        }
        else
        {
            check(0);
        }
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        UClass *Class = Cast<UClass>(FV8Utils::GetUObject(Context, Value));
        ObjectBaseProperty->SetObjectPropertyValue(ValuePtr, (Class && Class->IsChildOf(MetaClass)) ? Class : nullptr);
    }

private:
    UClass *MetaClass;
};

//containers

class FScriptArrayPropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FScriptArrayPropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty)
    {
    }

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool ByPointer) const override
    {
        FScriptArray *ScriptArray;
        if (ByPointer)
        {
            ScriptArray = const_cast<FScriptArray*>(reinterpret_cast<const FScriptArray*>(&ArrayProperty->GetPropertyValue(ValuePtr)));
        }
        else
        {
            ScriptArray = new FScriptArray;
            ArrayProperty->CopyCompleteValue(ScriptArray, ValuePtr);
        }
        return FV8Utils::IsolateData<IObjectMapper>(Isolate)->FindOrAddContainer(Isolate, Context, ArrayProperty->Inner, ScriptArray, ByPointer);
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        auto Ptr = FV8Utils::GetPoninter(Context, Value);
        if (Ptr)
        {
            ArrayProperty->CopyCompleteValue(ValuePtr, Ptr);
        }
    }

private:
        
};

class FScriptSetPropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FScriptSetPropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty)
    {
    }

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool ByPointer) const override
    {
        FScriptSet *ScriptSet;
        if (ByPointer)
        {
            ScriptSet = const_cast<FScriptSet*>(reinterpret_cast<const FScriptSet*>(&SetProperty->GetPropertyValue(ValuePtr)));
        }
        else
        {
            ScriptSet = new FScriptSet;
            SetProperty->CopyCompleteValue(ScriptSet, ValuePtr);
        }
        return FV8Utils::IsolateData<IObjectMapper>(Isolate)->FindOrAddContainer(Isolate, Context, SetProperty->ElementProp, ScriptSet, ByPointer);
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        auto Ptr = FV8Utils::GetPoninter(Context, Value);
        if (Ptr)
        {
            SetProperty->CopyCompleteValue(ValuePtr, Ptr);
        }
    }

private:

};

class FScriptMapPropertyTranslator : public FPropertyWithDestructorReflection
{
public:
    explicit FScriptMapPropertyTranslator(PropertyMacro *InProperty) : FPropertyWithDestructorReflection(InProperty)
    {
    }

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool ByPointer) const override
    {
        FScriptMap *ScriptMap;
        if (ByPointer)
        {
            ScriptMap = const_cast<FScriptMap*>(reinterpret_cast<const FScriptMap*>(&MapProperty->GetPropertyValue(ValuePtr)));
        }
        else
        {
            ScriptMap = new FScriptMap;
            MapProperty->CopyCompleteValue(ScriptMap, ValuePtr);
        }
        return FV8Utils::IsolateData<IObjectMapper>(Isolate)->FindOrAddContainer(Isolate, Context, MapProperty->KeyProp, MapProperty->ValueProp, ScriptMap, ByPointer);
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        auto Ptr = FV8Utils::GetPoninter(Context, Value);
        if (Ptr)
        {
            MapProperty->CopyCompleteValue(ValuePtr, Ptr);
        }
    }

private:

};

//delegate

//另外特殊处理
class DoNothingPropertyTranslator : public FPropertyTranslator
{
public:
    explicit DoNothingPropertyTranslator(PropertyMacro *InProperty) : FPropertyTranslator(InProperty) {}

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return v8::Undefined(Isolate);
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
            
    }
};

//fix array
class FFixArrayReflection : public FPropertyTranslator
{
public:
    std::unique_ptr<FPropertyTranslator> Inner;

    explicit FFixArrayReflection(std::unique_ptr<FPropertyTranslator> InInner): FPropertyTranslator(InInner->Property)
    {
        Inner = std::move(InInner);
    }

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        return FV8Utils::IsolateData<IObjectMapper>(Isolate)->CreateArray(Isolate, Context, Inner.get(), const_cast<void*>(ValuePtr));
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        //Fix Size Array do not assignable
    }

    virtual void Cleanup(void *ContainerPtr) const { Inner->Cleanup(ContainerPtr); }
};

class FOutReflection : public FPropertyTranslator
{
public:
    std::unique_ptr<FPropertyTranslator> Inner;

    explicit FOutReflection(std::unique_ptr<FPropertyTranslator> InInner) : FPropertyTranslator(InInner->Property)
    {
        Inner = std::move(InInner);
    }

    // {
    //    value : realvalue
    // }

    v8::Local<v8::Value> UEToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const void *ValuePtr, bool PassByPointer) const override
    {
        auto Result = v8::Object::New(Isolate);
        auto ReturnVal = Result->Set(Context, FV8Utils::InternalString(Isolate, "value"), Inner->UEToJs(Isolate, Context, ValuePtr, PassByPointer));
        return Result;
    }

    void JsToUE(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        if (Value->IsObject())
        {
            auto Outer = Value->ToObject(Context).ToLocalChecked();
            auto Realvalue = Outer->Get(Context, FV8Utils::InternalString(Isolate, "value")).ToLocalChecked();
            Inner->JsToUE(Isolate, Context, Realvalue, ValuePtr, DeepCopy);
        }
    }

    void UEOutToJs(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, const void *ValuePtr, bool PassByPointer) const override
    {
        if (Value->IsObject())
        {
            auto Outer = Value->ToObject(Context).ToLocalChecked();
            auto ReturnVal = Outer->Set(Context, FV8Utils::InternalString(Isolate, "value"), Inner->UEToJs(Isolate, Context, ValuePtr, PassByPointer));
        }
    }

    void JsToUEOut(v8::Isolate* Isolate, v8::Local<v8::Context>& Context, const v8::Local<v8::Value>& Value, void *ValuePtr, bool DeepCopy) const override
    {
        JsToUE(Isolate, Context, Value, ValuePtr, DeepCopy);
    }

    bool IsOut() const override { return true; }

    void Cleanup(void *ContainerPtr) const override { Inner->Cleanup(ContainerPtr); }
};

template<typename T>
std::unique_ptr<FPropertyTranslator> TCreateIgnoreOut(PropertyMacro *InProperty)
{
    if (InProperty->ArrayDim > 1)
    {
        return std::make_unique<FFixArrayReflection>(std::make_unique<T>(InProperty));
    }
    else
    {
        return std::make_unique<T>(InProperty);
    }
}

template<typename T>
std::unique_ptr<FPropertyTranslator> TCreate(PropertyMacro *InProperty, bool IgnoreOut)
{
    if (!IgnoreOut && (InProperty->PropertyFlags & CPF_Parm) && (InProperty->PropertyFlags & CPF_OutParm) && (!(InProperty->PropertyFlags & CPF_ConstParm)) && (!(InProperty->PropertyFlags & CPF_ReturnParm)))
    {
        return std::make_unique<FOutReflection>(TCreateIgnoreOut<T>(InProperty));
    }
    else
    {
        return TCreateIgnoreOut<T>(InProperty);
    }
}

// #lizard forgives
std::unique_ptr<FPropertyTranslator> FPropertyTranslator::Create(PropertyMacro *InProperty, bool IgnoreOut)
{
    if (InProperty->IsA<BytePropertyMacro>()
        || InProperty->IsA<Int8PropertyMacro>()
        || InProperty->IsA<Int16PropertyMacro>()
        || InProperty->IsA<IntPropertyMacro>()
        || InProperty->IsA<UInt16PropertyMacro>())
    {
        return TCreate<FInt32PropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<Int64PropertyMacro>())
    {
        return TCreate<FInt64PropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<UInt32PropertyMacro>())
    {
        return TCreate<FUInt32PropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<UInt64PropertyMacro>())
    {
        return TCreate<FUInt64PropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<DoublePropertyMacro>() || InProperty->IsA<FloatPropertyMacro>())//11
    {
        return TCreate<FNumberPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<EnumPropertyMacro>())
    {
        return TCreate<FEnumPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<BoolPropertyMacro>())
    {
        return TCreate<FBooleanPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<StrPropertyMacro>())
    {
        return TCreate<FStringPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<NamePropertyMacro>())
    {
        return TCreate<FNamePropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<TextPropertyMacro>())
    {
        return TCreate<FTextPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<ClassPropertyMacro>()//child of UObjectProperty
        || InProperty->IsA<SoftClassPropertyMacro>())//child of USoftObjectProperty
    {
        return TCreate<FClassPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<ObjectPropertyMacro>()
        || InProperty->IsA <WeakObjectPropertyMacro>()
        || InProperty->IsA<LazyObjectPropertyMacro>()
        || InProperty->IsA<SoftObjectPropertyMacro>())//22
    {
        return TCreate<FObjectPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<StructPropertyMacro>())
    {
        return TCreate<FScriptStructPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<InterfacePropertyMacro>())
    {
        return TCreate<FInterfacePropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<ArrayPropertyMacro>())
    {
        return TCreate<FScriptArrayPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<MapPropertyMacro>())
    {
        return TCreate<FScriptMapPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<SetPropertyMacro>())
    {
        return TCreate<FScriptSetPropertyTranslator>(InProperty, IgnoreOut);
    }
    else if (InProperty->IsA<DelegatePropertyMacro>()
        || InProperty->IsA<MulticastDelegatePropertyMacro>()
#if ENGINE_MINOR_VERSION >= 23
        || InProperty->IsA<MulticastInlineDelegatePropertyMacro>()
        || InProperty->IsA<MulticastSparseDelegatePropertyMacro>()
#endif
        )
    {
        return std::make_unique<DoNothingPropertyTranslator>(InProperty); //统一在别的地方处理
    }
    else
    {
        check(false);
    }
        
    return nullptr;
}
}
