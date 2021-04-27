// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "LatentActionState.generated.h"

DECLARE_DYNAMIC_DELEGATE(FLatentActionCallback);

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API ULatentActionState : public UObject
{
	GENERATED_BODY()
	
public:
    UPROPERTY()
    FLatentActionCallback LatentActionCallback;

    UFUNCTION()
    void OnLatentActionCompleted(int32 LinkID);

    UFUNCTION(BlueprintCallable)
    FLatentActionInfo GetLatentActionInfo();
};
