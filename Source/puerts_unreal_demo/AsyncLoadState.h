// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "UObject/NoExportTypes.h"
#include "AsyncLoadState.generated.h"


DECLARE_DYNAMIC_DELEGATE_OneParam(FLoadedCallback, UClass*, Obj);

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UAsyncLoadState : public UObject
{
	GENERATED_BODY()
	
public:
    UPROPERTY()
    FLoadedCallback LoadedCallback;

    UFUNCTION(BlueprintCallable)
    void StartLoad(FString InPath);

    void LoadFinish(FSoftClassPath InSoftBPClassPath);
};
