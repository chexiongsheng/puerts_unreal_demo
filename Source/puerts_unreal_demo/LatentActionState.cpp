// Fill out your copyright notice in the Description page of Project Settings.


#include "LatentActionState.h"

void ULatentActionState::OnLatentActionCompleted(int32 LinkID)
{
    LatentActionCallback.ExecuteIfBound();
}

FLatentActionInfo ULatentActionState::GetLatentActionInfo()
{
    FLatentActionInfo Ret(0, GetTypeHash(FGuid::NewGuid()), TEXT("OnLatentActionCompleted"), this);
    return Ret;
}
