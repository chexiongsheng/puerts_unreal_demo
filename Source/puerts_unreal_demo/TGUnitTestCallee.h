// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "TGUnitTestCallee.generated.h"

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UTGUnitTestCallee : public UObject
{
	GENERATED_BODY()

public:
    UFUNCTION(BlueprintCallable, Category = "TGameJs|TestCase")
    void NoArgNoRet();

    UFUNCTION(BlueprintCallable, Category = "TGameJs|TestCase")
    int RetInt();

    UFUNCTION(BlueprintCallable, Category = "TGameJs|TestCase")
    int IntArgIntRet(int Arg);

    UFUNCTION(BlueprintCallable, Category = "TGameJs|TestCase")
    int StrArgIntRet(FString Str);
};
