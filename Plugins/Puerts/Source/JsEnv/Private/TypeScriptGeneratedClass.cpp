/*
 * Tencent is pleased to support the open source community by making Puerts available.
 * Copyright (C) 2020 Tencent.  All rights reserved.
 * Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may
 * be subject to their corresponding license terms. This file is subject to the terms and conditions defined in file 'LICENSE',
 * which is part of this source code package.
 */

#include "TypeScriptGeneratedClass.h"
#include "Runtime/Launch/Resources/Version.h"
#include "PropertyMacros.h"
#include "JSGeneratedFunction.h"
#include "JSLogger.h"

DEFINE_FUNCTION(UTypeScriptGeneratedClass::execCallJS)
{
    UFunction* Func = Stack.CurrentNativeFunction ? Stack.CurrentNativeFunction : Stack.Node;
    check(Func);
    // UE_LOG(LogTemp, Warning, TEXT("overrided function called, %s(%p)"), *Func->GetName(), Func);

    UTypeScriptGeneratedClass* Class = Cast<UTypeScriptGeneratedClass>(Func->GetOuter());
    if (Class)
    {
#if WITH_EDITOR
        if (Context)
        {
            UTypeScriptGeneratedClass* ClassMayNeedReBind = nullptr;
            auto TempClass = Context->GetClass();

            while (TempClass && (TempClass != Class) && (!ClassMayNeedReBind || !ClassMayNeedReBind->NeedReBind))
            {
                ClassMayNeedReBind = Cast<UTypeScriptGeneratedClass>(TempClass);
                TempClass = TempClass->GetSuperClass();
            }
            if (ClassMayNeedReBind)
            {
                NotifyRebind(ClassMayNeedReBind);
            }
        }
#endif
        auto PinedDynamicInvoker = Class->DynamicInvoker.Pin();
        if (PinedDynamicInvoker)
        {
            PinedDynamicInvoker->InvokeTsMethod(Context, Func, Stack, RESULT_PARAM);
        }
        else
        {
            UE_LOG(Puerts, Error, TEXT("call %s::%s fail!, DynamicInvoker invalid"), *Class->GetName(), *Func->GetName());
        }
    }
    else
    {
        UE_LOG(Puerts, Error, TEXT("calling a not ts class method %s::%s"), *Func->GetOuter()->GetName(), *Func->GetName());
    }
}

DEFINE_FUNCTION(UTypeScriptGeneratedClass::execLazyLoadCallJS)
{
    UFunction* Function = Stack.CurrentNativeFunction ? Stack.CurrentNativeFunction : Stack.Node;
    check(Function);

    auto Class = Cast<UTypeScriptGeneratedClass>(Function->GetOuterUClassUnchecked());
#if !WITH_EDITOR
    auto PinedDynamicInvoker = Class->DynamicInvoker.Pin();
    if (PinedDynamicInvoker)
    {
        PinedDynamicInvoker->NotifyReBind(Class);
    }
#else
    NotifyRebind(Context ? Context->GetClass() : Class);
#endif
    Class->RestoreNativeFunc();
    execCallJS(Context, Stack, RESULT_PARAM);
}

#if WITH_EDITOR
void UTypeScriptGeneratedClass::NotifyRebind(UClass* Class)
{
    if (Class->ClassConstructor == &UTypeScriptGeneratedClass::StaticConstructor)
    {
        while (Class)
        {
            if (UTypeScriptGeneratedClass* TsClass = Cast<UTypeScriptGeneratedClass>(Class))
            {
                if (TsClass->NeedReBind && TsClass->DynamicInvoker.IsValid())
                {
                    TsClass->NeedReBind = false;
                    UTypeScriptGeneratedClass* CachedClass = TsClass;
                    Class = Class->GetSuperClass();
                    while (Class)
                    {
                        if (UTypeScriptGeneratedClass* SuperTsClass = Cast<UTypeScriptGeneratedClass>(Class))
                        {
                            SuperTsClass->NeedReBind = false;
                        }
                        Class = Class->GetSuperClass();
                    }
                    CachedClass->DynamicInvoker.Pin()->NotifyReBind(CachedClass);
                }
                return;
            }
            Class = Class->GetSuperClass();
        }
    }
}

void UTypeScriptGeneratedClass::LazyLoadRedirect()
{
    for (TFieldIterator<UFunction> FuncIt(this, EFieldIteratorFlags::ExcludeSuper); FuncIt; ++FuncIt)
    {
        auto Function = *FuncIt;
        if (!FunctionToRedirect.Contains(Function->GetFName()))
        {
            continue;
        }
        Function->FunctionFlags |= FUNC_BlueprintCallable | FUNC_BlueprintEvent | FUNC_Public | FUNC_Native;
        Function->SetNativeFunc(&UTypeScriptGeneratedClass::execLazyLoadCallJS);
        AddNativeFunction(*Function->GetName(), &UTypeScriptGeneratedClass::execLazyLoadCallJS);
    }
}
#endif

void UTypeScriptGeneratedClass::StaticConstructor(const FObjectInitializer& ObjectInitializer)
{
    auto Class = ObjectInitializer.GetClass();

    // 蓝图继承ts类，既然进了这里，表明链上必然有ts类，由于目前不支持ts继承蓝图，所以顶部节点往下找的第一个UTypeScriptGeneratedClass就是本类
    while (Class)
    {
        if (auto TypeScriptGeneratedClass = Cast<UTypeScriptGeneratedClass>(Class))
        {
            TypeScriptGeneratedClass->ObjectInitialize(ObjectInitializer);
            break;
        }
        Class = Class->GetSuperClass();
    }
}

void UTypeScriptGeneratedClass::RestoreNativeFunc()
{
    for (auto& KV : TempNativeFuncStorage)
    {
        // 没有被js重写的方法会被重置回去Native
        bool bContains = FunctionToRedirect.Contains(KV.Key);
        if (!bContains)
        {
            auto Function = FindFunctionByName(KV.Key, EIncludeSuperFlag::ExcludeSuper);
            if (Function)
            {
                FNativeFuncPtr InPointer = KV.Value;
                // fixcrash 异步加载时还没有postload导致UFunction的NativeFunc还没设置上就被缓存到TempNativeFuncStorage,
                // 错误Restore成空, 下次方法Invoke时空方法调用崩溃 两个条件：1. postload没有调用（异步时一般都没有调用） 2. js
                // module加载失败（例如删了ts和js被删了 但是TS代理蓝图还在使用）
                if (InPointer == nullptr)
                {
                    CancelFunctionRedirection(Function);
                }
                else
                {
                    Function->SetNativeFunc(InPointer);
                    AddNativeFunction(*Function->GetName(), InPointer);
                }
            }
        }
    }
    TempNativeFuncStorage.Empty();
}

void UTypeScriptGeneratedClass::ObjectInitialize(const FObjectInitializer& ObjectInitializer)
{
    auto Object = ObjectInitializer.GetObj();
    if (auto SuperTypeScriptGeneratedClass = Cast<UTypeScriptGeneratedClass>(GetSuperClass()))
    {
        SuperTypeScriptGeneratedClass->ObjectInitialize(ObjectInitializer);
    }
    else
    {
        GetSuperClass()->ClassConstructor(ObjectInitializer);
    }

#if !WITH_EDITOR
    if (Object->HasAnyFlags(RF_ClassDefaultObject | RF_ArchetypeObject))
        return;
#endif

    auto PinedDynamicInvoker = DynamicInvoker.Pin();
    if (PinedDynamicInvoker)
    {
#ifdef THREAD_SAFE
        PinedDynamicInvoker->TsConstruct(this, Object);
#else
        if (IsInGameThread())
        {
            PinedDynamicInvoker->TsConstruct(this, Object);
        }
#endif
    }
    else
    {
        UE_LOG(Puerts, Error, TEXT("call TsConstruct of %s(%p) fail!, DynamicInvoker invalid"), *Object->GetName(), Object);
    }

    if (UNLIKELY(!RedirectedToTypeScript))
    {
        for (TFieldIterator<UFunction> FuncIt(this, EFieldIteratorFlags::ExcludeSuper); FuncIt; ++FuncIt)
        {
            auto Function = *FuncIt;
            // 只有蓝图可重写的方法才需要设置LazyLoadCallJS重写
            if (!Function->IsNative() && Function->HasAnyFunctionFlags(FUNC_BlueprintEvent))
            {
                TempNativeFuncStorage.Add(Function->GetFName(), Function->GetNativeFunc());
                Function->FunctionFlags |= FUNC_Native;
                Function->SetNativeFunc(&UTypeScriptGeneratedClass::execLazyLoadCallJS);
                AddNativeFunction(*Function->GetName(), &UTypeScriptGeneratedClass::execLazyLoadCallJS);
            }
        }
        RedirectedToTypeScript = true;
    }
}

void UTypeScriptGeneratedClass::RedirectToTypeScript(UFunction* InFunction)
{
    if (!FunctionToRedirect.Contains(InFunction->GetFName()))
    {
        return;
    }
    InFunction->FunctionFlags |= FUNC_BlueprintCallable | FUNC_BlueprintEvent | FUNC_Public;
    InFunction->SetNativeFunc(&UTypeScriptGeneratedClass::execCallJS);
    AddNativeFunction(*InFunction->GetName(), &UTypeScriptGeneratedClass::execCallJS);
}

void UTypeScriptGeneratedClass::RedirectToTypeScriptFinish()
{
    for (TFieldIterator<UFunction> FuncIt(this, EFieldIteratorFlags::ExcludeSuper); FuncIt; ++FuncIt)
    {
        auto Function = *FuncIt;
        if (!FunctionToRedirect.Contains(Function->GetFName()))
        {
            continue;
        }
        Function->FunctionFlags |= FUNC_BlueprintCallable | FUNC_BlueprintEvent | FUNC_Public | FUNC_Native;
    }
}

void UTypeScriptGeneratedClass::CancelFunctionRedirection(UFunction* Function)
{
    Function->FunctionFlags &= ~FUNC_Native;
    // Function->SetNativeFunc(ProcessInternal);
    Function->Bind();    // the same as Function->SetNativeFunc(ProcessInternal) if no native
    NativeFunctionLookupTable.RemoveAll(
        [=](const FNativeFunctionLookup& NativeFunctionLookup) { return Function->GetFName() == NativeFunctionLookup.Name; });
}

void UTypeScriptGeneratedClass::CancelRedirection()
{
    for (TFieldIterator<UFunction> FuncIt(this, EFieldIteratorFlags::ExcludeSuper); FuncIt; ++FuncIt)
    {
        auto Function = *FuncIt;
        if (!FunctionToRedirect.Contains(Function->GetFName()))
        {
            continue;
        }
        CancelFunctionRedirection(Function);
    }
}

bool UTypeScriptGeneratedClass::NotSupportInject()
{
    return (GetName().StartsWith("SKEL_") || GetName().StartsWith("REINST_") || GetName().StartsWith("TRASHCLASS_") ||
            GetName().StartsWith("PLACEHOLDER-") || GetName().StartsWith("HOTRELOADED_"));
}

void UTypeScriptGeneratedClass::Bind()
{
    if (GetName().StartsWith("REINST_"))
    {
        for (TFieldIterator<UFunction> FuncIt(this, EFieldIteratorFlags::ExcludeSuper); FuncIt; ++FuncIt)
        {
            auto Function = *FuncIt;
            Function->FunctionFlags &= ~FUNC_Native;
        }
    }

    Super::Bind();

    if (NotSupportInject())
    {
        return;
    }

    if (HasConstructor)
    {
        // 普通对象会从CDO拷贝，而CDO会从蓝图AR那反序列化（见UBlueprintGeneratedClass::SerializeDefaultObject），这会
        // 导致TS的构造函数对生成的蓝图变量赋值都失效，不太符合程序员直觉，设置CPF_SkipSerialization可以跳过这个过程。
        // 然而在构造对象还有一个PostConstructInit步骤，里头有个从基类的CDO拷贝值的过程（ps：UE对象构造巨复杂，对象巨大）
        // 这个过程如果是CDO的话，目前只找到把属性的flag设置为CPF_Transient | CPF_InstancedReference才能搞定
        //  TODO: 后续尝试下TypeScript生成类不继承UBlueprintGeneratedClass的实现，能实现的话优雅些
        for (TFieldIterator<PropertyMacro> PropertyIt(this, EFieldIteratorFlags::ExcludeSuper); PropertyIt; ++PropertyIt)
        {
            PropertyMacro* Property = *PropertyIt;
            Property->SetPropertyFlags(CPF_SkipSerialization | CPF_Transient | CPF_InstancedReference);
        }

        // 可避免非CDO的在PostConstructInit从基类拷贝值
        //  ClassFlags |= CLASS_Native;
    }
#if WITH_EDITOR
    if (DynamicInvoker.IsValid())
#endif
    {
        ClassConstructor = &StaticConstructor;
    }
}
