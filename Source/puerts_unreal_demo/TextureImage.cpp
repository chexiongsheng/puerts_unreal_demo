// Fill out your copyright notice in the Description page of Project Settings.

#include "TextureImage.h"
#include "Async/Async.h"

void UTextureImage::SynchronizeProperties()
{
    Super::SynchronizeProperties();
    
    if (IsInGameThread())
    {
        SetBrushFromTexture(LoadObject<UTexture2D>(NULL, *TextureName), bMatchSize);
    }
    else
    {
        AsyncTask(ENamedThreads::GameThread, [=]()
        {
            SetBrushFromTexture(LoadObject<UTexture2D>(NULL, *TextureName), bMatchSize);
        });
    }
}