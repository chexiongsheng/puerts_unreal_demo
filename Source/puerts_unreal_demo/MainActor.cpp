// Fill out your copyright notice in the Description page of Project Settings.

#include "MainActor.h"

// Sets default values
AMainActor::AMainActor()
{
 	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AMainActor::BeginPlay()
{
	Super::BeginPlay();
	
}

// Called every frame
void AMainActor::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

    //通过delegate调用js的回调
    if ((++TickTimes == 100 || TickTimes == 200))
    {
        NotifyWithInt.Broadcast(1024);
        NotifyWithString.ExecuteIfBound("Hello");
        if (NotifyWithRefString.IsBound())
        {
            FString Str = TEXT("hello john che ");

            NotifyWithRefString.Execute(Str);
            UE_LOG(LogTemp, Warning, TEXT("NotifyWithRefString out ? %s"), *Str);
        }
        //auto Ret = NotifyWithStringRet.Execute("Hello");
        //UE_LOG(LogTemp, Warning, TEXT("NotifyWithStringRet ret:%s"), *Ret);
        NotifyWithNothing.Broadcast();
    }

}

