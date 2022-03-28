// Fill out your copyright notice in the Description page of Project Settings.

#include "TGUnitTestCallee.h"

void UTGUnitTestCallee::NoArgNoRet()
{
}

int UTGUnitTestCallee::RetInt()
{
    return 1024;
}

int UTGUnitTestCallee::IntArgIntRet(int Arg) 
{
    return Arg;
}

int UTGUnitTestCallee::StrArgIntRet(FString Arg)
{
    return Arg.Len();
}

int UTGUnitTestCallee::TArrayRefIntRet(TArray<FVector>& Data)
{
    return Data.Num();
}

int UTGUnitTestCallee::ConstTArrayRefIntRet(const TArray<FVector>& Data)
{
    return Data.Num();
}

TArray<int> UTGUnitTestCallee::TArrayRet()
{
    return {};
}

void UTGUnitTestCallee::CustomStructRefNoRet(FCustomStruct& Data)
{
    UE_LOG(LogTemp, Warning, TEXT("CustomStructRefNoRet(%p)"), &Data);
}
