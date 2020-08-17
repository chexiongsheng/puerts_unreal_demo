// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MainActor.generated.h"


DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam(FNotifyWithInt, int32, A);
DECLARE_DYNAMIC_DELEGATE_OneParam(FNotifyWithString, FString, A);
DECLARE_DYNAMIC_DELEGATE_RetVal_OneParam(FString, FNotifyWithStringRet, FString, A);
DECLARE_DYNAMIC_DELEGATE_OneParam(FNotifyWithRefString, FString&, A);
DECLARE_DYNAMIC_MULTICAST_DELEGATE(FNotifyWithNothing);

UCLASS()
class PUERTS_UNREAL_DEMO_API AMainActor : public AActor
{
	GENERATED_BODY()

public:
    UPROPERTY()
    FNotifyWithInt NotifyWithInt;

    UPROPERTY()
    FNotifyWithString NotifyWithString;

    UPROPERTY()
    FNotifyWithRefString NotifyWithRefString;

    UPROPERTY()
    FNotifyWithStringRet NotifyWithStringRet;

    UPROPERTY()
    FNotifyWithNothing NotifyWithNothing;

public:	
	// Sets default values for this actor's properties
	AMainActor();

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

private:
    int32 TickTimes;

};
