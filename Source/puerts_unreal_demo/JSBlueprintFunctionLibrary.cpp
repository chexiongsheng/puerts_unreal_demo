// Fill out your copyright notice in the Description page of Project Settings.

#include "JSBlueprintFunctionLibrary.h"

FString UJSBlueprintFunctionLibrary::GetName()
{
	return TEXT("小马哥");//返回中文
}

FString UJSBlueprintFunctionLibrary::Hello(FString To)
{
    FString Result = FString::Printf(TEXT("Hello %s"), *(To));
    UE_LOG(LogTemp, Warning, TEXT("%s"), *Result);
    return Result;
}

FString UJSBlueprintFunctionLibrary::Concat(FString First, FString Second)
{
	return First + Second;
}

void UJSBlueprintFunctionLibrary::Info(UClass* To)
{
	UE_LOG(LogTemp, Warning, TEXT("Info %s %p"), *(To->GetPathName()), To);
}

