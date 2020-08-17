// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "Components/Image.h"
#include "TextureImage.generated.h"

/**
 * 
 */
UCLASS()
class PUERTS_UNREAL_DEMO_API UTextureImage : public UImage
{
	GENERATED_BODY()
	
public:
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Appearance)
    bool bMatchSize = false;

    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = Appearance)
    FString TextureName;

    virtual void SynchronizeProperties() override;
};
