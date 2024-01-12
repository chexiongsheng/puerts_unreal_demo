#include "TestClass.h"
#include "Binding.hpp"
#include "Object.hpp"
#include "AdvanceTestClass.h"
#include "CoreMinimal.h"

UsingCppType(NoDeleteClass);
UsingCppType(BaseClass);
UsingCppType(TestClass);
UsingCppType(AdvanceTestClass);

class A
{
public:
    A()
    {
        a = 10;
        //printf("A constructor %p %d\n", this, a);
        UE_LOG(LogTemp, Warning, TEXT("A constructor %p %d"), this, a);
    }
    void Print()
    {
        //printf("A print %p %d\n", this, a);
        UE_LOG(LogTemp, Warning, TEXT("A print %p %d"), this, a);
    }
    int a;
};

class B: public virtual A
{
public:
};

class C: public virtual A
{
public:
};

class D: public B, public C
{
public:
    D()
    {
        //printf("D constructor %p %d\n", this, a);
        UE_LOG(LogTemp, Warning, TEXT("D constructor %p %d"), this, a);
    }
};

UsingCppType(A);
UsingCppType(D);
UsingCppType(std::vector<int>);


struct AutoRegisterForTestClass
{
    AutoRegisterForTestClass()
    {
        puerts::DefineClass<A>()
            .Method("Print", MakeFunction(&A::Print))
            .Property("a", MakeProperty(&A::a))
            .Constructor()
            .Register();

        puerts::DefineClass<D>()
            .Extends<A>()
            .Constructor()
            .MethodProxy<decltype(&A::Print), &A::Print>("Print")
            .PropertyProxy<decltype(&A::a), &A::a>("a")
            .Register();
        
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
            .Method("ThrowInCpp", MakeFunction(&TestClass::ThrowInCpp))
            .Method("CallBase", MakeCheckFunction(&TestClass::CallBase))
        //.Method("TV", MakeFunction(&TestClass::TV))
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
