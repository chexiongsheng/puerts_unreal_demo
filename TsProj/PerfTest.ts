import * as UE from 'ue'

let testobj:any = new UE.TGUnitTestCallee();

const LOOP_COUNT = 1000000;

let beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.NoArgNoRet();
}
let endTime = new Date();
console.log ("1m NoArgNoRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");


beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.RetInt();
}
endTime = new Date();
console.log ("1m RetInt using " + (endTime.getTime() - beginTime.getTime()) + "ms");

beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.IntArgIntRet(i);
}
endTime = new Date();
console.log ("1m IntArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");

beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.StrArgIntRet("hello world");
}
endTime = new Date();
console.log ("1m StrArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");

beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.sNoArgNoRet();
}
endTime = new Date();
console.log ("1m sNoArgNoRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");


beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.sRetInt();
}
endTime = new Date();
console.log ("1m sRetInt using " + (endTime.getTime() - beginTime.getTime()) + "ms");

beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.sIntArgIntRet(i);
}
endTime = new Date();
console.log ("1m sIntArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");

beginTime = new Date();
for(var i = 0; i < LOOP_COUNT; i++) {
    testobj.sStrArgIntRet("hello world");
}
endTime = new Date();
console.log ("1m sStrArgIntRet using " + (endTime.getTime() - beginTime.getTime()) + "ms");
