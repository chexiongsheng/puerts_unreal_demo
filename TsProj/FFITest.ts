import * as ffi from 'ffi';

//基础测试
const add = ffi.binding(0, "int32", ["int32", "int32"]);
console.log(`22 + 55 = ${add(22, 55)}`);

//回调
const int32TypeInfo = ffi.typeInfo("int32");
const int32pointerTypeInfo = ffi.makePointer("int32");

const qsort = ffi.binding(1, "void", ["pointer", "size_t", "size_t", "pointer"]);

const jsArray = [2,4,1,5,5,3,7,4,1,5];
let data = ffi.typeInfo("int32").alloc(...jsArray);

var line = "";

for(var i = 0; i < jsArray.length; i++) {
    line += ffi.typeInfo("int32").get(data, i) + ", ";
}
console.log("before qsort:" + line);

let cb = ffi.closure.alloc((x, y) => {
    let a = int32TypeInfo.read(x);
    let b = int32TypeInfo.read(y);
    return a - b;
}, "int32", [int32pointerTypeInfo, int32pointerTypeInfo])

qsort(data, jsArray.length, ffi.typeInfo("int32").size, ffi.closure.func(cb));

line = "";

for(var i = 0; i < jsArray.length; i++) {
    line += ffi.typeInfo("int32").get(data, i) + ", ";
}
console.log("after qsort:" + line);

ffi.closure.free(cb);

//可变参数
const printf_str_int = ffi.binding(2, "int32", ["cstring", "int32"], 1);
printf_str_int("hello %d", 1024);
