"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
let testobj = new UE.TGUnitTestCallee();
const LOOP_COUNT = 1000000;
let beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.NoArgNoRet();
}
let endTime = new Date();
console.log("1m NoArgNoRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.RetInt();
}
endTime = new Date();
console.log("1m RetInt using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.IntArgIntRet(i);
}
endTime = new Date();
console.log("1m IntArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.StrArgIntRet("hello world");
}
endTime = new Date();
console.log("1m StrArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
let v;
for (var i = 0; i < LOOP_COUNT; i++) {
    v = testobj.VP;
}
endTime = new Date();
console.log("1m Vector Property Get using " + (endTime.getTime() - beginTime.getTime()) + "ms");
v = new UE.Vector(1, 1, 1);
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.VP = v;
}
endTime = new Date();
console.log("1m Vector Property Set using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.sNoArgNoRet();
}
endTime = new Date();
console.log("1m sNoArgNoRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.sRetInt();
}
endTime = new Date();
console.log("1m sRetInt using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.sIntArgIntRet(i);
}
endTime = new Date();
console.log("1m sIntArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.sStrArgIntRet("hello world");
}
endTime = new Date();
console.log("1m sStrArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    v = testobj.sVP;
}
endTime = new Date();
console.log("1m Vector Property sGet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
v = new UE.Vector(1, 1, 1);
beginTime = new Date();
for (var i = 0; i < LOOP_COUNT; i++) {
    testobj.sVP = v;
}
endTime = new Date();
console.log("1m Vector Property sSet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
//# sourceMappingURL=PerfTest.js.map