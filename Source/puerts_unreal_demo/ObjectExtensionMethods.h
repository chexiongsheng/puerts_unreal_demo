// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "ExtensionMethods.h"
#include "ObjectExtensionMethods.generated.h"

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UObjectExtensionMethods : public UExtensionMethods
{
	GENERATED_BODY()
	
    UFUNCTION(BlueprintCallable, Category = "ObjectExtension")
    static bool IsValid(UObject *Object);

    UFUNCTION(BlueprintCallable, Category = "ObjectExtension")
    static FString GetName(UObject *Object);

    UFUNCTION(BlueprintCallable, Category = "ObjectExtension")
    static UObject *GetOuter(UObject *Object);

    UFUNCTION(BlueprintCallable, Category = "ObjectExtension")
    static UClass *GetClass(UObject *Object);

    UFUNCTION(BlueprintCallable, Category = "ObjectExtension")
    static UWorld *GetWorld(UObject *Object);
};
