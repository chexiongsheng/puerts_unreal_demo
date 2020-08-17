// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Kismet/BlueprintFunctionLibrary.h"
#include "JSBlueprintFunctionLibrary.generated.h"

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UJSBlueprintFunctionLibrary : public UBlueprintFunctionLibrary
{
	GENERATED_BODY()

	UFUNCTION(BlueprintCallable, Category = "Test")
	static FString GetName();

	UFUNCTION(BlueprintCallable, Category = "Test")
	static FString Hello(FString To);

	UFUNCTION(BlueprintCallable, Category = "Test")
	static FString Concat(FString First, FString Second);

	UFUNCTION(BlueprintCallable, Category = "Test")
	static void Info(UClass* To);
};
