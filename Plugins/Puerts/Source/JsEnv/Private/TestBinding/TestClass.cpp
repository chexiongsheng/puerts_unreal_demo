#include "TestClass.h"

void BaseClass::Foo(int p)
{
	UE_LOG(LogTemp, Warning, TEXT("BaseClass::Foo(%d)"), p);
}

TestClass::TestClass()
{
	UE_LOG(LogTemp, Warning, TEXT("0 TestClass::TestClass()"));
	X = 0;
	Y = 0;
}

TestClass::TestClass(int32_t InX, int32_t InY)
{
	UE_LOG(LogTemp, Warning, TEXT("1 TestClass::TestClass(%d, %d)"), InX, InY);
	X = InX;
	Y = InY;
}

int32_t TestClass::Add(int32_t a, int32_t b)
{
	UE_LOG(LogTemp, Warning, TEXT("TestClass::Add(%d, %d)"), a, b);
	return a + b;
}

void TestClass::Overload()
{
	UE_LOG(LogTemp, Warning, TEXT("0 TestClass::Overload()"));
}

void TestClass::Overload(int32_t a)
{
	UE_LOG(LogTemp, Warning, TEXT("1 TestClass::Overload(%d)"), a);
}

void TestClass::Overload(int32_t a, int32_t b)
{
	UE_LOG(LogTemp, Warning, TEXT("2 TestClass::Overload(%d, %d)"), a, b);
}

void TestClass::Overload(std::string a, int32_t b)
{
	UE_LOG(LogTemp, Warning, TEXT("3 TestClass::Overload(%s, %d)"), UTF8_TO_TCHAR(a.c_str()), b);
}


int32_t TestClass::OverloadMethod()
{
	UE_LOG(LogTemp, Warning, TEXT("0 TestClass::OverloadMethod(), X = %d, Y = %d"), X, Y);
	return 0;
}

int32_t TestClass::OverloadMethod(int32_t a)
{
	UE_LOG(LogTemp, Warning, TEXT("1 TestClass::OverloadMethod(%d), X = %d, Y = %d"), a, X, Y);
	return 1;
}

uint32_t TestClass::OverloadMethod(uint32_t a)
{
	UE_LOG(LogTemp, Warning, TEXT("2 TestClass::OverloadMethod(%u), X = %d, Y = %d"), a, X, Y);
	return a;
}

int64_t TestClass::OverloadMethod(int64_t a)
{
	UE_LOG(LogTemp, Warning, TEXT("3 TestClass::OverloadMethod(%lld), X = %d, Y = %d"), a, X, Y);
	return a;
}

TestClass * TestClass::GetSelf()
{
	UE_LOG(LogTemp, Warning, TEXT("1 TestClass::GetSelf()"));
	return this;
}

void TestClass::PrintInfo(TestClass * tc)
{
	UE_LOG(LogTemp, Warning, TEXT("0 TestClass::PrintInfo(), X = %d, Y = %d, StaticInt=%d"), tc->X, tc->Y, StaticInt);
}


int TestClass::Ref(int32_t & a)
{
	UE_LOG(LogTemp, Warning, TEXT("TestClass::Ref(%d)"), a);
	++a;
	return a + 1;
}

void TestClass::ConstRef(const int32_t & a)
{
	UE_LOG(LogTemp, Warning, TEXT("TestClass::ConstRef(%d)"), a);
}

int TestClass::StaticInt = 0;

const float TestClass::Ten = 10;