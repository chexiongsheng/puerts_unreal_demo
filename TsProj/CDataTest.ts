import {$ref, $unref} from 'puerts';
import * as cpp from 'cpp'

let TestClass = cpp.TestClass;

//static function
console.log(TestClass.Add(12, 34));

TestClass.Overload();
TestClass.Overload(1);
TestClass.Overload(1, 2);
TestClass.Overload("hello", 2);

//constructor
let obj = new TestClass();
obj = new TestClass(8, 9);

//method
obj.OverloadMethod()
obj.OverloadMethod(1024)
obj.OverloadMethod(4294967295)
obj.OverloadMethod(1024n)

//property
console.log(obj.X, obj.Y)
obj.X = 96
obj.Y = 97
console.log(obj.X, obj.Y)
obj.OverloadMethod()

//base method
obj.Foo(888);

//pass object
TestClass.PrintInfo(obj.GetSelf())

//static variable
console.log(TestClass.StaticInt)
TestClass.StaticInt = 789
console.log(TestClass.StaticInt)
TestClass.PrintInfo(obj.GetSelf())

//ref
let r = $ref(999);
let ret = obj.Ref(r);
console.log("$unref:" + $unref(r) + ", ret:" + ret);
obj.ConstRef(999);

//js object
let obj2  = new cpp.AdvanceTestClass(100);

let j:any = {p:100};
obj2.JsObjectTest(j);
console.log(j.q);

obj2.CallJsObjectTest((i, str) => {
    console.log(i, str);
    return 1.01;
})

obj2.StdFunctionTest((x:number, y:number) => {
    console.log('x=' + x + ",y=" + y);
    return x + y;
})
