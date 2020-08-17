// Fill out your copyright notice in the Description page of Project Settings.

#include "ObjectExtensionMethods.h"

bool UObjectExtensionMethods::IsValid(UObject *Object)
{
    return ::IsValid(Object);
}

FString UObjectExtensionMethods::GetName(UObject *Object)
{
    return Object->GetName();
}

UObject *UObjectExtensionMethods::GetOuter(UObject *Object)
{
    return Object->GetOuter();
}

UClass *UObjectExtensionMethods::GetClass(UObject *Object)
{
    return Object->GetClass();
}

UWorld *UObjectExtensionMethods::GetWorld(UObject *Object)
{
    return Object->GetWorld();
}
