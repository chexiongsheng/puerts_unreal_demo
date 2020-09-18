// Fill out your copyright notice in the Description page of Project Settings.


#include "TsGameInstance.h"

void UTsGameInstance::Init()
{
}

void UTsGameInstance::OnStart()
{
    GameScript = MakeShared<puerts::FJsEnv>();
    //GameScript = MakeShared<puerts::FJsEnv>(std::make_unique<puerts::DefaultJSModuleLoader>(TEXT("JavaScript")), std::make_shared<puerts::FDefaultLogger>(), 8080);
    //GameScript->WaitDebugger();
    TArray<TPair<FString, UObject*>> Arguments;
    Arguments.Add(TPair<FString, UObject*>(TEXT("Engine"), GEngine));
    Arguments.Add(TPair<FString, UObject*>(TEXT("World"), GetWorld()));
    GameScript->Start("QuickStart", Arguments);
}

void UTsGameInstance::Shutdown()
{
    GameScript.Reset();
}