import * as cpp from 'cpp'

let TestClass = cpp.TestClass;

console.log(TestClass.Add(12, 34));

console.log(TestClass.CheckedAdd(1, 2));

TestClass.Overload();
TestClass.Overload(1);
TestClass.Overload(1, 2);
TestClass.Overload("hello", 2);


let obj = new TestClass();


obj = new TestClass(8, 9);

obj.OverloadMethod()
obj.OverloadMethod(1024)
obj.OverloadMethod(4294967295)
obj.OverloadMethod(1024n)


console.log(obj.X, obj.Y)
obj.X = 96
obj.Y = 97
console.log(obj.X, obj.Y)
obj.OverloadMethod()

obj.Id(100);

obj.CheckedId(100);

obj.Foo(888);


TestClass.PrintInfo(obj.GetSelf())
