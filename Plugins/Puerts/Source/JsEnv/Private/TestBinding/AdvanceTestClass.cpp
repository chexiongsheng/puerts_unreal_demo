#include "AdvanceTestClass.h"

AdvanceTestClass::AdvanceTestClass(int A)
{
	UE_LOG(LogTemp, Warning, TEXT("AdvanceTestClass::AdvanceTestClass(%d)"), A);
}


void AdvanceTestClass::JsObjectTest(FJsObject Object)
{
	auto P = Object.Get<int>("p");
	UE_LOG(LogTemp, Warning, TEXT("AdvanceTestClass::JsObjectTest({p:%d})"), P);
	Object.Set<std::string>("q", "john");
}

void AdvanceTestClass::CallJsObjectTest(FJsObject Object)
{
	//Object.Action(1024, "che");
	auto Ret = Object.Func<float>(1024, "che");
	UE_LOG(LogTemp, Warning, TEXT("AdvanceTestClass::CallJsObjectTest Callback Ret %f"), Ret);
}

void AdvanceTestClass::StdFunctionTest(std::function<int(int, int)> Func)
{
	int Ret = Func(88, 99);
	UE_LOG(LogTemp, Warning, TEXT("AdvanceTestClass::StdFunctionTest Callback Ret %d"), Ret);
}
