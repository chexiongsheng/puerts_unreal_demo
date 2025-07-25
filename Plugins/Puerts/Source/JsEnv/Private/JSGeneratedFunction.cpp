/*
 * Tencent is pleased to support the open source community by making Puerts available.
 * Copyright (C) 2020 Tencent.  All rights reserved.
 * Puerts is licensed under the BSD 3-Clause License, except for the third-party components listed in the file 'LICENSE' which may
 * be subject to their corresponding license terms. This file is subject to the terms and conditions defined in file 'LICENSE',
 * which is part of this source code package.
 */

#include "JSGeneratedFunction.h"

DEFINE_FUNCTION(UJSGeneratedFunction::execCallJS)
{
#if !defined(ENGINE_INDEPENDENT_JSENV)
    UJSGeneratedFunction* Func = Cast<UJSGeneratedFunction>(Stack.CurrentNativeFunction ? Stack.CurrentNativeFunction : Stack.Node);
    check(Func);
    // UE_LOG(LogTemp, Warning, TEXT("overrided function called, %s(%p)"), *Func->GetName(), Func);

    if (Func)
    {
        auto PinedDynamicInvoker = Func->DynamicInvoker.Pin();
        if (PinedDynamicInvoker)
        {
            PinedDynamicInvoker->InvokeJsMethod(Context, Func, Stack, RESULT_PARAM);
        }
    }
#endif
}

DEFINE_FUNCTION(UJSGeneratedFunction::execCallMixin)
{
#if !defined(ENGINE_INDEPENDENT_JSENV)
    UFunction* Func = Stack.CurrentNativeFunction ? Stack.CurrentNativeFunction : Stack.Node;
    UJSGeneratedFunction* JsFunc = Cast<UJSGeneratedFunction>(Func);
    if (!JsFunc)
    {
        JsFunc = GetJSGeneratedFunctionFromScript(Func);
    }
    check(JsFunc);
    // UE_LOG(LogTemp, Warning, TEXT("overrided function called, %s(%p)"), *Func->GetName(), Func);

    if (JsFunc)
    {
        auto PinedDynamicInvoker = JsFunc->DynamicInvoker.Pin();
        if (PinedDynamicInvoker)
        {
            PinedDynamicInvoker->InvokeMixinMethod(Context, JsFunc, Stack, RESULT_PARAM);
        }
    }
#endif
}
