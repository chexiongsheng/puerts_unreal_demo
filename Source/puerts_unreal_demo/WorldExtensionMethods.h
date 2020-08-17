// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Engine/World.h"
#include "ExtensionMethods.h"
#include "WorldExtensionMethods.generated.h"

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UWorldExtensionMethods : public UExtensionMethods
{
    GENERATED_BODY()

    UFUNCTION(BlueprintCallable, Category = "WorldExtension")
    static AActor *SpawnActor(UWorld *World, UClass* Class, const FTransform &Transform, ESpawnActorCollisionHandlingMethod SpawnCollisionHandlingOverride, AActor *Owner, APawn *Instigator);

};
