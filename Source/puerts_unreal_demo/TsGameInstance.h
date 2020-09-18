// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "JsEnv.h"

#include "CoreMinimal.h"
#include "Engine/GameInstance.h"
#include "TsGameInstance.generated.h"

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UTsGameInstance : public UGameInstance
{
	GENERATED_BODY()

public:

    virtual void Init() override;

    virtual void OnStart() override;

    virtual void Shutdown() override;
	
private:
    TSharedPtr<puerts::FJsEnv> GameScript;
};
