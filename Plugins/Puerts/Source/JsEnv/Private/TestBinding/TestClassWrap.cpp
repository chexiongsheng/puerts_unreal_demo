#include "TestClass.h"
#include "Binding.hpp"

UsingCppClass(BaseClass);
UsingCppClass(TestClass);

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
		    .Constructors<MakeConstructor(TestClass, int32_t, int32_t), MakeConstructor(TestClass)>()
		    .Property("X", MakeGetter(&TestClass::X), MakeSetter(&TestClass::X))
		    .Property("Y", MakeGetter(&TestClass::Y), MakeSetter(&TestClass::Y))
		    .Function("CheckedAdd", MakeCheckFunction(&TestClass::Add))
		    .Function("Add", MakeFunction(&TestClass::Add))
		    .Method("CheckedId", MakeCheckFunction(&TestClass::Id))
		    .Function("PrintInfo", MakeFunction(&TestClass::PrintInfo))
		    .Method("GetSelf", MakeCheckFunction(&TestClass::GetSelf))
		    .Method("Id", MakeFunction(&TestClass::Id))
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
	}
};

AutoRegisterForTestClass _AutoRegisterForTestClass__;
