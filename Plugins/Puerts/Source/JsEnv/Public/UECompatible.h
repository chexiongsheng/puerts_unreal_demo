﻿/*
 * Tencent is pleased to support the open source community by making Puerts available.
 * Copyright (C) 2020 Tencent.  All rights reserved.
 * Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may
 * be subject to their corresponding license terms. This file is subject to the terms and conditions defined in file 'LICENSE',
 * which is part of this source code package.
 */

#pragma once

#include "Runtime/Launch/Resources/Version.h"
#include "CoreMinimal.h"
#include "UObject/Object.h"
#include "UObject/UObjectIterator.h"
#include "PuertsNamespaceDef.h"

namespace PUERTS_NAMESPACE
{
FORCEINLINE bool UEObjectIsPendingKill(const UObject* Test)
{
#if ENGINE_MAJOR_VERSION > 4
    return !IsValid(Test) || Test->IsUnreachable();
#else
    return Test->IsPendingKillOrUnreachable();
#endif
}

#if ENGINE_MAJOR_VERSION > 4
#define FUETicker FTSTicker
#define FUETickDelegateHandle FTSTicker::FDelegateHandle
#else
#define FUETicker FTicker
#define FUETickDelegateHandle FDelegateHandle
#endif

#if ENGINE_MINOR_VERSION >= 27 || ENGINE_MAJOR_VERSION > 4
typedef FThreadSafeObjectIterator FUEObjectIterator;
#else
typedef FObjectIterator FUEObjectIterator;
#endif

template <typename T>
T* FindAnyType(const TCHAR* InShortName)
{
#if (ENGINE_MAJOR_VERSION == 5 && ENGINE_MINOR_VERSION >= 1) || ENGINE_MAJOR_VERSION > 5
    return FindFirstObject<T>(
        InShortName, EFindFirstObjectOptions::EnsureIfAmbiguous | EFindFirstObjectOptions::NativeFirst, ELogVerbosity::Error);
#else
    return FindObject<T>(ANY_PACKAGE, InShortName);
#endif
}

template <typename T>
T* FindAnyType(const FString& InShortName)
{
    return FindAnyType<T>(*InShortName);
}
}    // namespace PUERTS_NAMESPACE