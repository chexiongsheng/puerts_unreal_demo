// Fill out your copyright notice in the Description page of Project Settings.


#include "AsyncLoadState.h"
#include "Engine/StreamableManager.h"
#include "Engine/AssetManager.h"

void UAsyncLoadState::StartLoad(FString InPath)
{
    FStreamableManager& AssetLoader = UAssetManager::GetStreamableManager();
    FSoftClassPath SoftBPClassPathName = FSoftClassPath(InPath);
    FStreamableDelegate streamableDelegate;
    streamableDelegate.BindUObject(this, &ThisClass::LoadFinish, SoftBPClassPathName);
    AssetLoader.RequestAsyncLoad(SoftBPClassPathName, streamableDelegate);
}

void UAsyncLoadState::LoadFinish(FSoftClassPath InSoftBPClassPath)
{
    TSoftClassPtr<UObject> ClassPtr = TSoftClassPtr<UObject>(InSoftBPClassPath);
    LoadedCallback.ExecuteIfBound(ClassPtr.Get());
}
