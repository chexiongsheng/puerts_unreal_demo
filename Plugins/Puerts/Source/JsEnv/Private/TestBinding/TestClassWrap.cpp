#include "TestClass.h"
#include "Binding.hpp"
#include "AdvanceTestClass.h"

UsingCppType(BaseClass);
UsingCppType(TestClass);
UsingCppType(AdvanceTestClass);

struct AutoRegisterForTestClass
{
    AutoRegisterForTestClass()
    {
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
            .Function("Add", MakeFunction(&TestClass::Add))
            .Function("PrintInfo", MakeFunction(&TestClass::PrintInfo))
            .Method("GetSelf", MakeFunction(&TestClass::GetSelf))
            .Method("Ref", MakeFunction(&TestClass::Ref))
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
