#pragma once

#include <string>
#include <vector>

class BaseClass
{
public:
	int A;
	int B;

	void Foo(int p);
};

class NoDeleteClass
{
public:
    NoDeleteClass()
    {
        //UE_LOG(LogTemp, Warning, TEXT("NoDeleteClass"));
    }
    ~NoDeleteClass() = delete;
};

class TestParameter111
{
public:
	int a;
	int b;
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

    void NoEmptyRef(NoDeleteClass & o) const
    {
        //UE_LOG(LogTemp, Warning, TEXT("NoEmptyRef %p"), &o);
    }

    int Ptr(int32_t * a);

    const char* CStr(const char* str);

    void StrPtr(std::string * str);

	void ConstRef(const int32_t & a);

	void ThrowInCpp(bool bthrow);

	void TV(std::vector<int> v)
	{
		
	}

	void CallBase(BaseClass *b)
	{
		//UE_LOG(LogTemp, Warning, TEXT("CallBase"));
		b->Foo(10);
	}

    static int StaticInt;

    static const float Ten;

	int32_t XGetter() const
	{
		return X;
	}

	std::vector<TestParameter111*> store;


	void Push(TestParameter111 a)
	{
		store.push_back(new TestParameter111(a));
	}

	void Remove(int idx)
	{
		delete store[idx];
		store.erase(store.begin( ) + idx);
	}

	TestParameter111 * Get(int idx)
	{
		return store[idx];
	}

	int Num()
	{
		return store.size();
	}
};

class float3
{
public:
	static constexpr bool bPrint = false;
	~float3()
	{
		if (bPrint)
			UE_LOG(LogTemp, Warning, TEXT("~float3()\n"));
	}
	float3()
		: x(0)
		, y(0)
		, z(0)
	{
		if (bPrint)
			UE_LOG(LogTemp, Warning, TEXT("float3()\n"));
	}

	float3(float x, float y, float z)
		: x(x)
		, y(y)
		, z(z)
	{
		if (bPrint)
			UE_LOG(LogTemp, Warning, TEXT("float3(x,y,z)\n"));
	}

	float3(const float3& other)
		: x(other.x)
		, y(other.y)
		, z(other.z)
	{
		if (bPrint)
			UE_LOG(LogTemp, Warning, TEXT("float3(const float3&)\n"));
	}

	float3(float3&& other)
		: x(other.x)
		, y(other.y)
		, z(other.z)
	{
		other.x = 0;
		other.y = 0;
		other.z = 0;

		if (bPrint)
			UE_LOG(LogTemp, Warning, TEXT("float3(float3&&)\n"));
	}

	float3& operator=(const float3& other)
	{
		this->x = other.x;
		this->y = other.y;
		this->z = other.z;

		if (bPrint)
			UE_LOG(LogTemp, Warning, TEXT("operator=(const float3&)\n"));
		return *this;
	}

	float3& operator=(float3&& other)
	{
		this->x = other.x;
		this->y = other.y;
		this->z = other.z;

		other.x = 0;
		other.y = 0;
		other.z = 0;
		if (bPrint)
			UE_LOG(LogTemp, Warning, TEXT("operator=(float3&&)\n"));
		return *this;
	}

	float x, y, z;
};

class float3test
{
public:
	static void printFloatPoint(float* f)
	{
		UE_LOG(LogTemp, Warning, TEXT("printFloatPoint %f\n"), *f);
	}
	
	static void printFloatConstPoint(const float* f)
	{
		UE_LOG(LogTemp, Warning, TEXT("printFloatConstPoint %f\n"), *f);
	}

	static void printStringConstPoint(const std::string* str)
	{
		if (!str)
		{
			UE_LOG(LogTemp, Warning, TEXT("printStringConstPoint nullptr..........\n"));
			return;
		}
		FString temp = UTF8_TO_TCHAR((*str).c_str());
		UE_LOG(LogTemp, Warning, TEXT("printStringConstPoint: \t%s\n"), *temp);
	}

	static void printFloat3Point(float3* v)
	{
		if (!v)
		{
			UE_LOG(LogTemp, Warning, TEXT("printFloat3Point nullptr..........\n"));
			return;
		}
		UE_LOG(LogTemp, Warning, TEXT("printFloat3Ref \t\tx:%f, y:%f, z:%f\n"), v->x, v->y, v->z);
	}
	
	static void printFloat3ConstPoint(const float3* v)
	{
		if (!v)
		{
			UE_LOG(LogTemp, Warning, TEXT("printFloat3ConstPoint nullptr..........\n"));
			return;
		}
		UE_LOG(LogTemp, Warning, TEXT("printFloat3ConstPoint \t\tx:%f, y:%f, z:%f\n"), v->x, v->y, v->z);
	}

	static std::string& retStringRef()
	{
		static std::string ss = "YYXXZZZ";
		return ss;
	}

	static const std::string* retConstStringPtr()
	{
		static std::string ss = "66689uuyy";
		return &ss;
	}

	static const float* retConstFloatPtr()
	{
		static float aa = 1234;
		return &aa;
	}

	static float3& retFloat3()
	{
		static float3 aa(4, 5, 6);
		return aa;
	}

	static float& retFloat()
	{
		static float aa = 999;
		return aa;
	}
};

