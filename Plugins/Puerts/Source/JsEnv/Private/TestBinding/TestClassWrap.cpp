#include "TestClass.h"
#include "Binding.hpp"
#include "Object.hpp"
#include "AdvanceTestClass.h"

UsingCppType(NoDeleteClass);
UsingCppType(BaseClass);
UsingCppType(TestClass);
UsingCppType(AdvanceTestClass);


struct AutoRegisterForTestClass
{
    AutoRegisterForTestClass()
    {
        puerts::DefineClass<NoDeleteClass>()
            .Constructor()
            .Register();
        
        puerts::DefineClass<BaseClass>()
            .Method("Foo", MakeFunction(&BaseClass::Foo))
            .Register();

        puerts::DefineClass<TestClass>()
            .Extends<BaseClass>()
            //.Constructor<int32_t, int32_t>() //if only one Constructor
            .Constructor(CombineConstructors(
                MakeConstructor(TestClass, int32_t, int32_t),
                MakeConstructor(TestClass)
                ))
            .Property("X", MakeProperty(&TestClass::X))
            .Property("Y", MakeProperty(&TestClass::Y))
            .Variable("StaticInt", MakeVariable(&TestClass::StaticInt))
            .Variable("Ten", MakeReadonlyVariable(&TestClass::Ten))
            .Function("Add", MakeFunction(&TestClass::Add))
            .Function("PrintInfo", MakeFunction(&TestClass::PrintInfo))
            .Method("GetSelf", MakeFunction(&TestClass::GetSelf))
            .Method("NoEmptyRef", MakeFunction(&TestClass::NoEmptyRef))
            .Method("Ref", MakeFunction(&TestClass::Ref))
            .Method("StrRef", MakeFunction(&TestClass::StrRef))
            .Method("Ptr", MakeFunction(&TestClass::Ptr))
            .Method("CStr", MakeFunction(&TestClass::CStr))
            .Method("StrPtr", MakeFunction(&TestClass::StrPtr))
            .Method("ConstRef", MakeFunction(&TestClass::ConstRef))
            .Function("Overload", CombineOverloads(
                MakeOverload(void(*)(), &TestClass::Overload),
                MakeOverload(void(*)(int32_t), &TestClass::Overload),
                MakeOverload(void(*)(int32_t, int32_t), &TestClass::Overload),
                MakeOverload(void(*)(std::string, int32_t), &TestClass::Overload)
                ))
            .Method("OverloadMethod", CombineOverloads(
                MakeOverload(int32_t(TestClass::*)(), &TestClass::OverloadMethod),
                MakeOverload(int32_t(TestClass::*)(int32_t), &TestClass::OverloadMethod),
                MakeOverload(uint32_t(TestClass::*)(uint32_t), &TestClass::OverloadMethod),
                MakeOverload(int64_t(TestClass::*)(int64_t), &TestClass::OverloadMethod)
                ))
            .Register();

        puerts::DefineClass<AdvanceTestClass>()
            .Constructor<int>() //if only one Constructor
            .Method("JsObjectTest", MakeFunction(&AdvanceTestClass::JsObjectTest))
            .Method("CallJsObjectTest", MakeFunction(&AdvanceTestClass::CallJsObjectTest))
            .Method("StdFunctionTest", MakeFunction(&AdvanceTestClass::StdFunctionTest))
            .Register();
    }
};

AutoRegisterForTestClass _AutoRegisterForTestClass__;
