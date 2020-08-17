// Fill out your copyright notice in the Description page of Project Settings.


#include "TsGameInstance.h"

void UTsGameInstance::Init()
{
    GameScript = MakeShared<puerts::FJsEnv>();
    TArray<TPair<FString, UObject*>> Arguments;
    Arguments.Add(TPair<FString, UObject*>(TEXT("Engine"), GEngine));
    Arguments.Add(TPair<FString, UObject*>(TEXT("World"), GetWorld()));
    GameScript->Start("QuickStart", Arguments);
}

void UTsGameInstance::Shutdown()
{
    GameScript.Reset();
}