// Fill out your copyright notice in the Description page of Project Settings.

#include "MainObject.h"

UMainObject::UMainObject()
{
    V = { 1, 2, 4 };

    SomeData.Alignment = { 8, 16 };

    SomeData.DoNoSerialize = 99;
    SomeData.WillSerialize = 88;
    MyArray.Add(1024);
    MyArray.Add(777);

    MySet.Add(TEXT("John"));
    MySet.Add(TEXT("Hello"));

    MyMap.Add(TEXT("John"), 1);
    MyMap.Add(TEXT("Hello"), 2);

    for (int i = 0; i < 100; ++i)
    {
        MyFixSizeArray[i] = 99 - i;
    }
}

int32 UMainObject::Add(int32 a, int32 b) const
{
    //UE_LOG(LogTemp, Warning, TEXT("UMyObject::Add(%d, %d)"), a, b);
    return a + b;
}

FString UMainObject::Foo() const
{
    return TEXT("UMyObject::Foo");
}


FString UMainObject::Bar(FVector V) const
{
    FString Result = FString::Printf(TEXT("UMyObject::Bar(%s)"), *V.ToString());
    UE_LOG(LogTemp, Warning, TEXT("%s"), *Result);
    return Result;
}

FString UMainObject::Bar2(FVector& V) const
{
    FString Result = FString::Printf(TEXT("UMyObject::Bar2(%s)"), *V.ToString());
    UE_LOG(LogTemp, Warning, TEXT("%s"), *Result);
    V.X = 1024;
    return Result;
}

FVector UMainObject::Bar3(FVector& V) const
{
    UE_LOG(LogTemp, Warning, TEXT("UMyObject::Bar3(%s)"), *V.ToString());
    V.X = 1024;
    return V + 1;
}

TArray<uint8> UMainObject::GetData()
{
    TArray<uint8> ret;
    ret.Add(1);
    ret.Add(3);
    return ret;
}

TArray<FString> UMainObject::GetStrings()
{
    TArray<FString> ret;
    ret.Add(TEXT("Hello"));
    ret.Add(TEXT("World"));
    return ret;
}

TArray<int32> UMainObject::GetInts()
{
    TArray<int32> ret;
    ret.Add(1);
    ret.Add(4);
    return ret;
}

void UMainObject::EnumTest(EToTest E)
{
    UE_LOG(LogTemp, Warning, TEXT("UMyObject::EnumTest(%d)"), (int32)E);
}

void  UMainObject::PrintState() const
{
    UE_LOG(LogTemp, Warning, TEXT("V = %s"), *(V.ToString()));
    UE_LOG(LogTemp, Warning, TEXT("SomeData.Alignment = %s"), *(SomeData.Alignment.ToString()));
    UE_LOG(LogTemp, Warning, TEXT("SomeData.DoNoSerialize = %d"), SomeData.DoNoSerialize);
    UE_LOG(LogTemp, Warning, TEXT("SomeData.WillSerialize = %d"), SomeData.WillSerialize);
}
