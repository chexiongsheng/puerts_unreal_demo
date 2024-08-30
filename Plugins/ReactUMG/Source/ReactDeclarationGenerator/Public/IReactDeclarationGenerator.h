/*
 * Tencent is pleased to support the open source community by making Puerts available.
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 * Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may
 * be subject to their corresponding license terms. This file is subject to the terms and conditions defined in file 'LICENSE',
 * which is part of this source code package.
 */

#pragma once

//UE5.3已经去掉了IScriptGeneratorPluginInterface,改用C#实现UHT;
//ReactUMG目前并没有用到UHT的代码生成,不需要引用;
//另外 cstdio似乎也用不到,一并屏蔽
#if ENGINE_MAJOR_VERSION < 5
#include <cstdio>

#include "IScriptGeneratorPluginInterface.h"
#endif

#include "Modules/ModuleManager.h"
#include "CoreMinimal.h"

class IReactDeclarationGenerator : public IModuleInterface
{
public:
    static inline IReactDeclarationGenerator& Get()
    {
        return FModuleManager::LoadModuleChecked<IReactDeclarationGenerator>("ReactDeclarationGenerator");
    }

    static inline bool IsAvailable()
    {
        return FModuleManager::Get().IsModuleLoaded("ReactDeclarationGenerator");
    }
};
