"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
let a1 = UE.NewArray(UE.BuiltinBool);
let a2 = UE.NewArray(UE.BuiltinInt);
let a3 = UE.NewArray(UE.BuiltinString);
let a4 = UE.NewArray(UE.Actor);
let a5 = UE.NewArray(UE.Vector);
let s1 = UE.NewSet(UE.BuiltinString);
let m1 = UE.NewMap(UE.BuiltinString, UE.BuiltinInt);
//TArray
console.log("----------------------------------------------------");
for (var i = 0; i < 10; i++) {
    a2.Add(i + 88);
}
function printTArray(arr) {
    console.log("-----Num:", arr.Num());
    for (var i = 0; i < arr.Num(); i++) {
        console.log(i, ":", arr.Get(i));
    }
}
printTArray(a2);
a2.Add(888);
a2.Set(0, 7);
printTArray(a2);
a5.Add(new UE.Vector(7, 8, 9));
printTArray(a5);
console.log(a5.Get(0).ToString());
a3.Add("hello");
a3.Add("world");
a3.Add("TArray<string>");
printTArray(a3);
//TSet
console.log("----------------------------------------------------");
s1.Add("John");
s1.Add("Che");
console.log(s1.Num());
console.log(s1.Contains("John"));
console.log(s1.Contains("Che"));
console.log(s1.Contains("Hello"));
//TMap
console.log("----------------------------------------------------");
m1.Add("John", 0);
m1.Add("Che", 1);
console.log(m1.Get("John"));
console.log(m1.Get("Che"));
console.log(m1.Get("Hello"));
m1.Add("Che", 10);
console.log(m1.Get("Che"));
//# sourceMappingURL=NewContainer.js.map