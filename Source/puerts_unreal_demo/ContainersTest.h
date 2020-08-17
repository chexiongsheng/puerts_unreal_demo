#pragma once

#include "CoreMinimal.h"
#include "ContainersTest.generated.h"

UENUM()
enum class EnumInt32 : int32
{
    VM1 = -1,
    V0 = 0,
    V1 = 1,
    V2 = 2,
    V3 = 3
};

UENUM()
enum class EnumInt8Min : int8
{
    VINT8_MIN = TNumericLimits<int8>::Min()
    // what's the value of EnumInt8Min_MAX?
};

UENUM()
enum class EnumInt8Max : int8
{
    VINT8_MAX = TNumericLimits<int8>::Max()
    // what's the value of EnumInt8Max_MAX?
};

USTRUCT()
struct FScriptStructTest
{
    GENERATED_BODY();
};

UCLASS(/*meta = (TGameJSMainObject)*/)
class /*PUERTS_UNREAL_DEMO_API*/ UContainersTest: public UObject
{
    GENERATED_BODY()

public:
    UContainersTest();

    UPROPERTY()
        TArray<int32> Int32Array;

    UPROPERTY()
        TArray<int32> Int32ArrayWithInit;

    UPROPERTY()
        TArray<uint32> UInt32Array;

    UPROPERTY()
        TArray<int64> Int64Array;

    UPROPERTY()
        TArray<uint64> UInt64Array;
    
    UPROPERTY()
        TArray<float> FloatArray;
    
    UPROPERTY()
        TArray<double> DoubleArray;
    
    UPROPERTY()
        TArray<bool> BoolArray;
    
    UPROPERTY()
        TArray<EnumInt32> EnumInt32Array;
    
    UPROPERTY()
        TArray<EnumInt8Min> EnumInt8MinArray;
    
    UPROPERTY()
        TArray<EnumInt8Max> EnumInt8MaxArray;
    
    UPROPERTY()
        TArray<FString> FStringArray;
    
    UPROPERTY()
        TArray<FName> FNameArray;
    
    UPROPERTY()
        TArray<FText> FTextArray;
    
//    UPROPERTY()
//        FScriptStructTest ScriptStructTest;   // TODO
    
//    UPROPERTY()
//        TArray<TArray<int32>> NestedArray;    // 嵌套容器不能作为属性，否则编译器报错
    
    UPROPERTY()
        int32 Int32FixSizeArray[1024];
    
    UPROPERTY()
        TSet<int32> Int32Set;
    
    UPROPERTY()
        TSet<FString> FStringSet;
    
    UPROPERTY()
        TMap<int32, FString> Int32ToStrMap;
    
    UPROPERTY()
        TMap<FString, FString> StrToStrMap;
};
