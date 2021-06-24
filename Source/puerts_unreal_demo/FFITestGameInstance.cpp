// Fill out your copyright notice in the Description page of Project Settings.


#include "FFITestGameInstance.h"

#include "FFIBinding.h"

static int Add(int a, int b)
{
	UE_LOG(LogTemp, Warning, TEXT("add(%d, %d)"), a, b);
	return a + b;
}

void UFFITestGameInstance::OnStart()
{
	static FuncPtr Funcs[] = {(FuncPtr)Add, (FuncPtr)qsort, (FuncPtr)printf};
	SetFunctionArray(Funcs,  sizeof (Funcs) / sizeof (Funcs[0]));
	JsEnv = MakeShared<puerts::FJsEnv>();
	TArray<TPair<FString, UObject*>> Arguments;
	Arguments.Add(TPair<FString, UObject*>(TEXT("GameInstance"), this));
	JsEnv->Start("FFITest", Arguments);
}

void UFFITestGameInstance::Shutdown()
{
	JsEnv.Reset();
}