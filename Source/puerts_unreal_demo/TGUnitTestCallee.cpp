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
