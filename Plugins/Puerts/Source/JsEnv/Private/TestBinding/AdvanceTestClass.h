#pragma once

#include <string>
#include "JsObject.h"

class AdvanceTestClass
{
public:
    AdvanceTestClass(int A);

    void JsObjectTest(FJsObject Object);

    void CallJsObjectTest(FJsObject Object);

    void StdFunctionTest(std::function<int(int, int)> Func);
};