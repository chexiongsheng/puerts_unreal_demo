#pragma once

#include <string>

class BaseClass
{
public:
	int A;
	int B;

	void Foo(int p);
};

class TestClass : public BaseClass
{
public:
	int32_t X;
	int32_t Y;

	TestClass();
	
	TestClass(int32_t InX, int32_t InY);

	static int32_t Add(int32_t a, int32_t b);

	static void Overload();
	
	static void Overload(int32_t a);

	static void Overload(int32_t a, int32_t b);

	static void Overload(std::string a, int32_t b);

	int32_t OverloadMethod();

	int32_t OverloadMethod(int32_t a);

	uint32_t OverloadMethod(uint32_t a);

	int64_t OverloadMethod(int64_t a);

	TestClass *GetSelf();

	static void PrintInfo(TestClass *);

	int Ref(int32_t & a);

    void StrRef(std::string & str);

    int Ptr(int32_t * a);

    const char* CStr(const char* str);

    void StrPtr(std::string * str);

	void ConstRef(const int32_t & a);

    static int StaticInt;

    static const float Ten;
};