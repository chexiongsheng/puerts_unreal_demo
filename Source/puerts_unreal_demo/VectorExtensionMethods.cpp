// Fill out your copyright notice in the Description page of Project Settings.

#include "VectorExtensionMethods.h"

FString UVectorExtensionMethods::ToString(FVector &This)
{
    return This.ToString();
}

void UVectorExtensionMethods::Set(FVector &This, float InX, float InY, float InZ)
{
    This.Set(InX, InY, InZ);
}
