"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ffi = require("ffi");
//基础测试
const Add = ffi.binding(0, "int32", ["int32", "int32"]);
console.log(`22 + 55 = ${Add(22, 55)}`);
//回调
const int32TypeInfo = ffi.typeInfo("int32");
const int32pointerTypeInfo = ffi.makePointer("int32");
const qsort = ffi.binding(1, "void", ["pointer", "size_t", "size_t", "pointer"]);
const jsArray = [2, 4, 1, 5, 5, 3, 7, 4, 1, 5];
let data = ffi.typeInfo("int32").alloc(...jsArray);
var line = "";
for (var i = 0; i < jsArray.length; i++) {
    line += ffi.typeInfo("int32").get(data, i) + ", ";
}
console.log("before qsort:" + line);
let cb = ffi.closure.alloc((x, y) => {
    let a = int32pointerTypeInfo.unref(x);
    let b = int32pointerTypeInfo.unref(y);
    return a - b;
}, "int32", [int32pointerTypeInfo, int32pointerTypeInfo]);
qsort(data, jsArray.length, ffi.typeInfo("int32").size, ffi.closure.func(cb));
line = "";
for (var i = 0; i < jsArray.length; i++) {
    line += ffi.typeInfo("int32").get(data, i) + ", ";
}
console.log("after qsort:" + line);
ffi.closure.free(cb);
//可变参数
const printf_str_int = ffi.binding(2, "int32", ["cstring", "int32"], 1);
printf_str_int("hello %d", 1024);
//结构体
let structType = ffi.makeStruct({ A: "int32", B: "int32" });
const PrintTestDataByValue = ffi.binding(4, "void", [structType]);
let p = new structType({ A: 100, B: 101 });
PrintTestDataByValue(p);
const structTypePtr = ffi.makePointer(structType);
const PrintTestDataByPtr = ffi.binding(3, "void", [structTypePtr]);
PrintTestDataByPtr(structTypePtr.ref(p));
//返回函数指针，通过指针调用函数
const GetFunc = ffi.binding(5, "pointer", []);
const PtrAdd = GetFunc();
const Add2 = ffi.binding(PtrAdd, "int32", ["int32", "int32"]);
console.log(`100 + 200 = ${Add2(100, 200)}`);
//# sourceMappingURL=FFITest.js.map