// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "ExtensionMethods.h"
#include "VectorExtensionMethods.generated.h"

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UVectorExtensionMethods : public UExtensionMethods
{
	GENERATED_BODY()
	
    UFUNCTION(BlueprintCallable, Category = "VectorExtension")
    static FString ToString(FVector &This);

    UFUNCTION(BlueprintCallable, Category = "VectorExtension")
    static void Set(FVector &This, float InX, float InY, float InZ);
};
