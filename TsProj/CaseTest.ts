import * as UE from 'ue';
import {$ref, $unref, $set, argv} from 'puerts';
import * as assert from './MyAssert';
import './mocha';

/*
 * 测试示例
 */
describe('Test Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

/*
 * 测试path模块，在mocha中使用
 */
let Path = (globalThis as any).require('path');

describe('Path Module', function() {
    it('path.resolve should be a function', function() {
        assert.equal(typeof Path.resolve, typeof function(){});
    });
});

describe('Path Module', function() {
    it('path.resolve(\'Hello.js\') should be \'./Hello.js\'', function() {
        assert.equal(Path.resolve('Hello.js'), './Hello.js');
    });
});

/*
 * 测试Base.ts的内容
 */

let obj = new UE.MainObject();

//成员访问
describe('Access Object Member: obj.MyString', function() {
    it('before set, should be empty/undefined', function() {
        assert.equal(obj.MyString, '');
    });
    it('after set, should be \'PPPPP\'', function() {
        obj.MyString = "PPPPP";
        assert.equal(obj.MyString, "PPPPP");
    });
});

//简单类型参数函数
describe('Function with POD Type Parameters: obj.Add()', function() {
    it('obj.Add(100, 300) should return 400', function() {
        assert.equal(obj.Add(100, 300), 400);
    });
});

//复杂类型参数函数
describe('Function with Non-POD Type Parameters: obj.Bar()', function() {
    it('obj.Bar(new UE.Vector(1, 2, 3) should return \'UMyObject::Bar(X=1.000 Y=2.000 Z=3.000)\'', function() {
        assert.equal(obj.Bar(new UE.Vector(1, 2, 3)), 'UMyObject::Bar(X=1.000 Y=2.000 Z=3.000)');
    });
});

//引用类型参数函数
describe('Function with Reference Type Parameters: $ref()', function() {
    let vectorRef = $ref(new UE.Vector(1, 2, 3));
    it('obj.Bar2($ref(new UE.Vector(1, 2, 3))) should return \'UMyObject::Bar2(X=1.000 Y=2.000 Z=3.000)\'', function() {
        assert.equal(obj.Bar2(vectorRef), 'UMyObject::Bar2(X=1.000 Y=2.000 Z=3.000)');
    });
    it('The X value of the argument passed to obj.Bar2() should be modified to 1024.000', function() {
        assert.equal(obj.Bar($unref(vectorRef)), 'UMyObject::Bar(X=1024.000 Y=2.000 Z=3.000)');
    });
});

//静态方法
describe('Calling BlueprintCallable Static Methods', function() {
    let str1 = UE.JSBlueprintFunctionLibrary.GetName();
    it('UE.JSBlueprintFunctionLibrary.GetName() should return \'小马哥\'', function() {
        assert.equal(str1, '小马哥');
    });
    it('UE.JSBlueprintFunctionLibrary.Hello(str2) should return \'Hello , 小马哥\'', function() {
        let str2 = UE.JSBlueprintFunctionLibrary.Concat(', ', str1);
        assert.equal(UE.JSBlueprintFunctionLibrary.Hello(str2), 'Hello , 小马哥');
    });
});

//扩展方法，和C#的扩展方法类似
describe('Calling Extension Methods', function() {
    let v = new UE.Vector(3, 2, 1);
    it('v.ToString() should return \'X=3.000 Y=2.000 Z=1.000\'', function() {
        assert.equal(v.ToString(), 'X=3.000 Y=2.000 Z=1.000');
    });
    it('After calling v.Set(8, 88, 888), v.ToString() should return \'X=8.000 Y=88.000 Z=888.000\'', function() {
        v.Set(8, 88, 888);
        assert.equal(v.ToString(), 'X=8.000 Y=88.000 Z=888.000');
    });
});

//枚举
describe('Test UEnum', function() {
    it('UE.EToTest.V1 should be 1', function() {
        assert.equal(UE.EToTest.V1, 1);
    });
    it('UE.EToTest.V13 should be 13', function() {
        assert.equal(UE.EToTest.V13, 13);
    })
});

//定长数组
describe('Test Fix Size Array', function() {
    it('Size of obj.MyFixSizeArray should be 100', function() {
        assert.equal(obj.MyFixSizeArray.Num(), 100);
    });
    it('MyFixSizeArray[i] should be 99-i', function() {
        assert.equal(obj.MyFixSizeArray.Get(32), 99-32);
        assert.equal(obj.MyFixSizeArray.Get(33), 99-33);
        assert.equal(obj.MyFixSizeArray.Get(34), 99-34);
    });
    it('MyFixSizeArray.Set(33, 1000) should make [33] be 1000', function() {
        obj.MyFixSizeArray.Set(33, 1000)
        assert.equal(obj.MyFixSizeArray.Get(32), 99-32);
        assert.equal(obj.MyFixSizeArray.Get(33), 1000);
        assert.equal(obj.MyFixSizeArray.Get(34), 99-34);
    });
});

//TArray
describe('Test TArray', function() {
    it('Size of obj.MyArray should be 2: [0]:1024, [1]:777', function() {
        assert.equal(obj.MyArray.Num(), 2);
        assert.equal(obj.MyArray.Get(0), 1024);
        assert.equal(obj.MyArray.Get(1), 777);
    });
    it('After adding an element, size of obj.MyArray should be 3: [0]:1024, [1]:777, [2]:888', function() {
        obj.MyArray.Add(888);
        assert.equal(obj.MyArray.Num(), 3);
        assert.equal(obj.MyArray.Get(0), 1024);
        assert.equal(obj.MyArray.Get(1), 777);
        assert.equal(obj.MyArray.Get(2), 888);
    });
    it('After set [0] to 7, content of obj.MyArray should be: [0]:7, [1]:777, [2]:888', function() {
        obj.MyArray.Set(0, 7);
        assert.equal(obj.MyArray.Get(0), 7);
        assert.equal(obj.MyArray.Get(1), 777);
        assert.equal(obj.MyArray.Get(2), 888);
    });
});

//TSet
describe('Test TSet', function() {
    it('Size of obj.MySet should be 2: {\"Hello\", \"John\"}', function() {
        assert.equal(obj.MySet.Num(), 2);
        assert.equal(obj.MySet.Contains("John"), true);
        assert.equal(obj.MySet.Contains("Hello"), true);
        assert.notEqual(obj.MySet.Contains("Che"), true);
    });
});

//TMap
describe('Test TMap', function() {
    it('Size of obj.MyMap should be 2: {{\"John\", 1}, {\"Hello\", 2}}', function() {
        assert.equal(obj.MyMap.Num(), 2);
        assert.equal(obj.MyMap.Get("John"), 1);
        assert.equal(obj.MyMap.Get("Hello"), 2);
        assert.equal(obj.MyMap.Get("Che"), undefined);
    });
    it('After adding {\"Che\", 10}, content of obj.MyMap should be: {{\"John\", 1}, {\"Hello\", 2}, {\"Che\", 10}}', function() {
        obj.MyMap.Add("Che", 10)
        assert.equal(obj.MyMap.Num(), 3);
        assert.equal(obj.MyMap.Get("John"), 1);
        assert.equal(obj.MyMap.Get("Hello"), 2);
        assert.equal(obj.MyMap.Get("Che"), 10);
    });
});

let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();
let actor = world.SpawnActor(UE.MainActor.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.MainActor;

//引擎方法
describe('Calling Engine Methods', function() {
    it('actor.GetName should be \'MainActor_0\'', function() {
        assert.equal(actor.GetName(), 'MainActor_0');
    });
    it('actor.K2_GetActorLocation().ToString() should be \'X=0.000 Y=0.000 Z=0.000\'', function() {
        assert.equal(actor.K2_GetActorLocation().ToString(), 'X=0.000 Y=0.000 Z=0.000');
    });
});

//Delegate
describe('Test Delegate', function() {
    it('Test Multicast, Add and Broadcast', function() {
        let multicastResult1: string;
        let multicastResult2: string;
        function MutiCast1(i) {
            multicastResult1 = 'MutiCast1<<<' + i;
        }
        function MutiCast2(i) {
            multicastResult2 = 'MutiCast2>>>' + i;
            actor.NotifyWithInt.Remove(MutiCast2);//调用一次后就停掉
        }
        actor.NotifyWithInt.Add(MutiCast1);
        actor.NotifyWithInt.Add(MutiCast2);

        actor.NotifyWithInt.Broadcast(888999);
        assert.equal(multicastResult1, 'MutiCast1<<<888999');
        assert.equal(multicastResult2, 'MutiCast2>>>888999');
    });

    it('If the delegate is not bound, IsBound() should return false', function() {
        assert.equal(actor.NotifyWithString.IsBound(), false);
        assert.equal(actor.NotifyWithRefString.IsBound(), false);
    });

    let outerStrRef: string;

    it('If the delegate is bound, IsBound() should return true', function() {
        actor.NotifyWithRefString.Bind((strRef) => {
            outerStrRef = $unref(strRef);
            $set(strRef, 'out to NotifyWithRefString');//引用参数输出
        });

        assert.equal(actor.NotifyWithString.IsBound(), false);
        assert.equal(actor.NotifyWithRefString.IsBound(), true);
    });

    it('Executing NotifyWithRefString delegate', function() {
        let strRef = $ref('666');
        actor.NotifyWithRefString.Execute(strRef);

        assert.equal(outerStrRef, '666');
        assert.equal($unref(strRef), 'out to NotifyWithRefString');
    });

    it('Executing a delegate with return value', function() {
        actor.NotifyWithStringRet.Bind((inStr) => {
            return "////" + inStr;
        });
        let retStr = actor.NotifyWithStringRet.Execute('console.log("hello world")');

        assert.equal(retStr, '////console.log("hello world")');
    });
});

/*
 * 测试容器的接口，元素类型涵盖PropertyTranslator支持的所有类型、边界、组合
 */
let testObj = new UE.ContainersTest();

describe('Test TArray<int32>', function() {
    /* 先保证基本功能正确 */
    it('Num', function() {
        assert.equal(testObj.Int32Array.Num(), 0, 'Num of an empty array should be 0');
        assert.equal(testObj.Int32ArrayWithInit.Num(), 3, 'Num of an array with 3 initialized elements should be 3');
    });
    it('IsValidIndex', function() {
        assert.equal(testObj.Int32Array.IsValidIndex(0), false, '0 is not a valid index of an empty array');
        assert.equal(testObj.Int32ArrayWithInit.IsValidIndex(0), true);
        assert.equal(testObj.Int32ArrayWithInit.IsValidIndex(1), true);
        assert.equal(testObj.Int32ArrayWithInit.IsValidIndex(2), true);
        assert.equal(testObj.Int32ArrayWithInit.IsValidIndex(3), false);
    });
    it('Empty', function() {
        testObj.Int32ArrayWithInit.Empty();
        assert.equal(testObj.Int32ArrayWithInit.Num(), 0, 'After emptying an array, the num of the array should be 0');
    });
    it('Add', function() {
        const ADD_NUM = 10;
        for (let i = 0; i < ADD_NUM; ++i) {
            testObj.Int32Array.Add(i);
        }
        assert.equal(testObj.Int32Array.Num(), ADD_NUM, 'After adding ADD_NUM elements to an empty array, the num of the array should be ADD_NUM');
    });
    it('Get', function() {
        for (let i = 0; i < testObj.Int32Array.Num(); ++i) {
            testObj.Int32Array.IsValidIndex(i);
            assert.equal(testObj.Int32Array.Get(i), i, 'Adding value i at index i');
        }
        // 如果Get索引越界，抛异常
        // TODO - assert提供“接收异常”的语义
        // testObj.Int32Array.Get(testObj.Int32Array.Num());
    });
    it('Set', function() {
        for (let i = 0; i < testObj.Int32Array.Num(); ++i) {
            testObj.Int32Array.Set(i, 2 * i);
            assert.equal(testObj.Int32Array.Get(i), 2 * i, 'Setting value of the element at index i to 2*i');
        }
        let ele_num = testObj.Int32Array.Num();
        // 如果Set索引越界，抛异常
        // TODO - assert提供“接收异常”的语义
        // testObj.Int32Array.Set(ele_num, ele_num);
    });
    it('Contains', function() {
        let ele_num = testObj.Int32Array.Num();
        for (let i = 0; i < ele_num; ++i) {
            assert.equal(testObj.Int32Array.Contains(2 * i), true);
        }
        assert.equal(testObj.Int32Array.Contains(2 * ele_num), false);
    });
    it('FindIndex', function() {
        let ele_num = testObj.Int32Array.Num();
        for (let i = 0; i < ele_num; ++i) {
            assert.equal(testObj.Int32Array.FindIndex(2 * i), i);
        }
        assert.equal(testObj.Int32Array.FindIndex(2 * ele_num), -1, 'Finding the index of an element that does not exist should return -1');
    });
    it('RemoveAt', function() {
        let ele_num = testObj.Int32Array.Num();
        // 删除前ele_num/2个元素
        for (let i = 0; i < ele_num / 2; ++i) {
            testObj.Int32Array.RemoveAt(0);
        }
        assert.equal(testObj.Int32Array.Num(), ele_num - ele_num/2, 'After removing front ele_num/2 elements, the num of elements should be (ele_num - ele_num/2)');
        // 检查IsValidIndex
        let rest_num = ele_num - ele_num/2;
        assert.equal(rest_num, testObj.Int32Array.Num());
        for (let i = 0; i < ele_num; ++i) {
            if (i < rest_num) {
                assert.equal(testObj.Int32Array.IsValidIndex(i), true)
            }
            else {
                assert.equal(testObj.Int32Array.IsValidIndex(i), false, 'RemoveAt() should shrink the array');
            }
        }
        // 原本数组后一半的元素前移
        for (let i = 0; i < testObj.Int32Array.Num(); ++i) {
            assert.equal(testObj.Int32Array.Get(i), 2*(i + ele_num/2));
        }
        // 如果RemoveAt索引越界，抛异常
    });
    /* 临界值 */
    it('Empty the array', function() {
        testObj.Int32Array.Empty();
        assert.equal(testObj.Int32Array.Num(), 0);
    });
    it('Add boundary values to the int32 array', function() {
        // TArray<int32>无法呈现MAX_SAFE_INTEGER（64-bits）
        testObj.Int32Array.Add(Number.MAX_SAFE_INTEGER);            // 不安全地型转为其他值
        assert.equal(testObj.Int32Array.IsValidIndex(0), true);     // TODO - 调用Contains会先把参数不安全地型转为其他值，然后再在容器内寻找。这样一来尽管保存的不是真正的MAX_SAFE_INTEGER，Contains却会返回true
        // assert.equal(testObj.Int32Array.Contains(Number.MAX_SAFE_INTEGER), false, 'TArray<int32> should not be able to represent Number.MAX_SAFE_INTEGER');
        assert.notEqual(testObj.Int32Array.Get(0), Number.MAX_SAFE_INTEGER, 'The value of element in the TArray<int32> that was assigned as MAX_SAFE_INTEGER should not be MAX_SAFE_INTEGER');
        assert.equal(testObj.Int32Array.Get(0), -1, 'The value of a int32 variable that was assigned MAX_SAFE_INTEGER(2^53-1) should be -1');

        // TArray<int32>无法呈现MIN_SAFE_INTEGER（64-bits）
        testObj.Int32Array.Add(Number.MIN_SAFE_INTEGER);
        assert.equal(testObj.Int32Array.IsValidIndex(1), true);
        assert.notEqual(testObj.Int32Array.Get(1), Number.MIN_SAFE_INTEGER, 'The value of element in the TArray<int32> that was assigned as MIN_SAFE_INTEGER should not be MIN_SAFE_INTEGER');
        assert.equal(testObj.Int32Array.Get(1), 1, 'The value of a int32 variable that was assigned MIN_SAFE_INTEGER(-1*(2^53-1)) should be 1');

        // 最大为2^31-1
        const MAX_INT32 = Math.pow(2, 31) - 1;
        testObj.Int32Array.Add(MAX_INT32);
        assert.equal(testObj.Int32Array.IsValidIndex(2), true);
        assert.equal(testObj.Int32Array.Get(2), MAX_INT32, 'TArray<int32> should be able to represent MAX_INT32');

        // 最小为-1*2^31
        const MIN_INT32 = Math.pow(2, 31) * -1;
        testObj.Int32Array.Add(MIN_INT32);
        assert.equal(testObj.Int32Array.IsValidIndex(3), true);
        assert.equal(testObj.Int32Array.Get(3), MIN_INT32, 'TArray<int32> should be able to represent MIN_INT32');

        // 溢出测试，MAX_INT32 + 1 == MIN_INT32
        testObj.Int32Array.Add(MAX_INT32 + 1);
        assert.equal(testObj.Int32Array.IsValidIndex(4), true);
        assert.notEqual(testObj.Int32Array.Get(4), MAX_INT32 + 1, 'The value of element in the TArray<int32> that was assigned as (MAX_INT32+1) should not be (MAX_INT32+1)');
        assert.equal(testObj.Int32Array.Get(4), MIN_INT32, '(MAX_INT32+1) should be MIN_INT32');

        // 溢出测试，MIN_INT32 - 1 == MAX_INT32
        testObj.Int32Array.Add(MIN_INT32 - 1);
        assert.equal(testObj.Int32Array.IsValidIndex(5), true);
        assert.notEqual(testObj.Int32Array.Get(5), MIN_INT32 - 1, 'The value of element in the TArray<int32> that was assigned as (MIN_INT32-1) should not be (MIN_INT32-1)');
        assert.equal(testObj.Int32Array.Get(5), MAX_INT32, '(MIN_INT32-1) should be MAX_INT32');
    });
});

describe('Test TArray<uint32>', function () {
    /* 临界值 */
    it('Empty the array', function () {
        testObj.UInt32Array.Empty();
        assert.equal(testObj.UInt32Array.Num(), 0);
    });
    it('Add boundary values to the uint32 array', function () {
        // uint32无法呈现MAX_SAFE_INTEGER
        testObj.UInt32Array.Add(Number.MAX_SAFE_INTEGER);
        assert.equal(testObj.UInt32Array.IsValidIndex(0), true);
        assert.notEqual(testObj.UInt32Array.Get(0), Number.MAX_SAFE_INTEGER, 'TArray<uint32> cannot represent MAX_SAFE_INTEGER');

        // uint32无法呈现MIN_SAFE_INTEGER
        testObj.UInt32Array.Add(Number.MIN_SAFE_INTEGER);
        assert.equal(testObj.UInt32Array.IsValidIndex(1), true);
        assert.notEqual(testObj.UInt32Array.Get(1), Number.MIN_SAFE_INTEGER, 'TArray<uint32> cannot represent MIN_SAFE_INTEGER');

        // uint32的合法数值范围0~(2^32-1)，最大值
        const MAX_UINT32 = Math.pow(2, 32) - 1;
        testObj.UInt32Array.Add(MAX_UINT32);
        assert.equal(testObj.UInt32Array.IsValidIndex(2), true);
        assert.equal(testObj.UInt32Array.Get(2), MAX_UINT32, 'TArray<uint32> should be able to represent MAX_UINT32');

        // uint32最小值
        const MIN_UINT32 = 0;
        testObj.UInt32Array.Add(0);
        assert.equal(testObj.UInt32Array.IsValidIndex(3), true);
        assert.equal(testObj.UInt32Array.Get(3), MIN_UINT32, 'TArray<uint32> should be able to represent MIN_UINT32');
        
        // 溢出测试，MAX_UINT32 + 1 == MIN_UINT32
        testObj.UInt32Array.Add(MAX_UINT32 + 1);
        assert.equal(testObj.UInt32Array.IsValidIndex(4), true);
        assert.equal(testObj.UInt32Array.Get(4), MIN_UINT32, '(MAX_UINT32+1) should be MIN_UINT32');

        // 溢出测试，MIN_UINT32 - 1 == MAX_UINT32
        testObj.UInt32Array.Add(MIN_UINT32 - 1);
        assert.equal(testObj.UInt32Array.IsValidIndex(5), true);
        assert.equal(testObj.UInt32Array.Get(5), MAX_UINT32, '(MIN_UINT32-1) should be MAX_UINT32');
    });
    /* 非临界值 */
});

describe('Test TArray<int64>', function() {
    /* 临界值 */
    it('Empty the array', function () {
        testObj.Int64Array.Empty();
        assert.equal(testObj.Int64Array.Num(), 0);
    });
    it('Add boundary values to the int64 array', function () {
        // TODO - 当用例错误，且包含bigint时，mocha内的JSON.stringify报错：'Do not know how to serialize a BigInt'

        // int64能呈现MAX_SAFE_INTEGER
        const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
        testObj.Int64Array.Add(MAX_SAFE_INTEGER);
        assert.equal(testObj.Int64Array.IsValidIndex(0), true);
        assert.equal(testObj.Int64Array.Get(0), MAX_SAFE_INTEGER, 'TArray<int64> should be able to represent MAX_SAFE_INTEGER');

        // int64能呈现MIN_SAFE_INTEGER
        const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
        testObj.Int64Array.Add(MIN_SAFE_INTEGER);
        assert.equal(testObj.Int64Array.IsValidIndex(1), true);
        assert.equal(testObj.Int64Array.Get(1), MIN_SAFE_INTEGER, 'TArray<int64> should be able to represent MIN_SAFE_INTEGER');

        // int64能呈现MAX_INT64
        const MAX_INT64 = BigInt("0x7FFFFFFFFFFFFFFF");
        testObj.Int64Array.Add(MAX_INT64);
        assert.equal(testObj.Int64Array.IsValidIndex(2), true);
        assert.equal(testObj.Int64Array.Get(2), MAX_INT64, 'TArray<int64> should be able to represent MAX_INT64');

        // int64能呈现MIN_INT64
        const MIN_INT64 = -1n * MAX_INT64 - 1n;
        testObj.Int64Array.Add(MIN_INT64);
        assert.equal(testObj.Int64Array.IsValidIndex(3), true);
        assert.equal(testObj.Int64Array.Get(3), MIN_INT64, 'TArray<int64> should be able to represent MIN_INT64');

        // 溢出测试，MAX_INT64 + 1 == MIN_INT64
        testObj.Int64Array.Add(MAX_INT64 + 1n);
        assert.equal(testObj.Int64Array.IsValidIndex(4), true);
        assert.equal(testObj.Int64Array.Get(4), MIN_INT64, '(MAX_INT64+1n) should be MIN_INT64');
        
        // 溢出测试，MIN_INT64 - 1 == MAX_INT64
        testObj.Int64Array.Add(MIN_INT64 - 1n);
        assert.equal(testObj.Int64Array.IsValidIndex(5), true);
        assert.equal(testObj.Int64Array.Get(5), MAX_INT64, '(MIN_INT64-1n) should be MAX_INT64');
    }); 
    /* 非临界值 */
});

describe('Test TArray<uint64>', function() {
    it('Add boundary values to the uint64 array', function() {
        testObj.UInt64Array.Empty();
        assert.equal(testObj.UInt64Array.Num(), 0);
        
        // uint64能呈现MAX_SAFE_INTEGER
        const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
        testObj.UInt64Array.Add(MAX_SAFE_INTEGER);
        assert.equal(testObj.UInt64Array.IsValidIndex(0), true);
        assert.equal(testObj.UInt64Array.Get(0), MAX_SAFE_INTEGER, 'TArray<uint64> should be able to represent MAX_SAFE_INTEGER');

        // uint64无法呈现MIN_SAFE_INTEGER（因为是负数）
        const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
        testObj.UInt64Array.Add(MIN_SAFE_INTEGER);
        assert.equal(testObj.UInt64Array.IsValidIndex(1), true);
        assert.notEqual(testObj.UInt64Array.Get(1), MIN_SAFE_INTEGER, 'TArray<uint64> cannot represent MIN_SAFE_INTEGER');
        
        // uint64的最大值MAX_UINT64
        const MAX_UINT64 = BigInt("0xFFFFFFFFFFFFFFFF");
        testObj.UInt64Array.Add(MAX_UINT64);
        assert.equal(testObj.UInt64Array.IsValidIndex(2), true);
        assert.equal(testObj.UInt64Array.Get(2), MAX_UINT64, 'TArray<uint64> should be able to represent MAX_UINT64');
        
        // uint64的最小值MIN_UINT64
        const MIN_UINT64 = 0n;
        testObj.UInt64Array.Add(MIN_UINT64);
        assert.equal(testObj.UInt64Array.IsValidIndex(3), true);
        assert.equal(testObj.UInt64Array.Get(3), MIN_UINT64, 'TArray<uint64> should be able to represent MIN_UINT64');

        // 溢出测试，MAX_UINT64 + 1 == MIN_UINT64
        testObj.UInt64Array.Add(MAX_UINT64 + 1n);
        assert.equal(testObj.UInt64Array.IsValidIndex(4), true);
        assert.equal(testObj.UInt64Array.Get(4), MIN_UINT64, '(MAX_UINT64+1n) should be MIN_UINT64');

        // 溢出测试，MIN_UINT64 - 1 == MAX_UINT64
        testObj.UInt64Array.Add(MIN_UINT64 - 1n);
        assert.equal(testObj.UInt64Array.IsValidIndex(5), true);
        assert.equal(testObj.UInt64Array.Get(5), MAX_UINT64, '(MIN_INT64-1n) should be MAX_INT64');

    });
});

describe('Test TArray<float>', function() {
    it('Add boundary values to the float array', function() {
        testObj.FloatArray.Empty();
        assert.equal(testObj.FloatArray.Num(), 0);

        // float无法呈现MAX_VALUE
        const MAX_VALUE = Number.MAX_VALUE;
        testObj.FloatArray.Add(MAX_VALUE);
        assert.equal(testObj.FloatArray.IsValidIndex(0), true);
        assert.notEqual(testObj.FloatArray.Get(0), MAX_VALUE, 'TArray<float> cannot represent MAX_VALUE');

        // float无法呈现MIN_VALUE（注：此处使用的并不是Number.MIN_VALUE，Number.MIN_VALUE是Number能表示的最小正值，而非最小值）
        const MIN_VALUE = -MAX_VALUE;
        testObj.FloatArray.Add(MIN_VALUE);
        assert.equal(testObj.FloatArray.IsValidIndex(1), true);
        assert.notEqual(testObj.FloatArray.Get(1), MIN_VALUE, 'TArray<float> cannot represent MIN_VALUE');

        // float的最大值MAX_FLOAT
        const MAX_FLOAT = 3.402823466e+38;
        testObj.FloatArray.Add(MAX_FLOAT);
        assert.equal(testObj.FloatArray.IsValidIndex(2), true);
        // TODO - 从FloatArray取出值[2]，精度变大：3.4028234663852886e+38，不等于原来的MAX_FLOAT。误差小于0.000000001e+38
        // assert.equal(testObj.FloatArray.Get(2), MAX_FLOAT, 'TArray<float> should be able to represent MAX_FLOAT');
        assert.ok(Math.abs(testObj.FloatArray.Get(2) - MAX_FLOAT) < 0.000000001e+38, 'Math.abs(testObj.FloatArray.Get(2) - MAX_FLOAT) should less than 0.000000001e+38');
        
        // MAX_FLOAT加上一个较小的数值后溢出（阶码相同，尾数取能产生进位的最小值。查看浮点数二进制：https://www.h-schmidt.net/FloatConverter/IEEE754.html）
        testObj.FloatArray.Add(MAX_FLOAT + 0.0000002e+38);
        assert.equal(testObj.FloatArray.IsValidIndex(3), true);
        assert.equal(testObj.FloatArray.Get(3), Infinity, 'MAX_FLOAT + 0.000000002e+38 should overflow');

        // MAX_FLOAT+MAX_FLOAT对float而言是Infinity，对ECMAScript Number而言则不是
        testObj.FloatArray.Add(MAX_FLOAT + MAX_FLOAT);
        assert.equal(testObj.FloatArray.IsValidIndex(4), true);
        assert.equal(testObj.FloatArray.Get(4), Infinity, 'MAX_FLOAT + MAX_FLOAT should be Infinity for float number');
        assert.notEqual(MAX_FLOAT + MAX_FLOAT, Infinity, 'MAX_FLOAT + MAX_FLOAT should not be Infinity for double number(ECMAScript Number)');

        // float的最小值MIN_FLOAT
        const MIN_FLOAT = -3.402823466e+38;
        testObj.FloatArray.Add(MIN_FLOAT);
        assert.equal(testObj.FloatArray.IsValidIndex(5), true);
        // 从FloatArray取出值[5]，精度变大：-3.4028234663852886e+38，不等于原来的MIN_FLOAT
        // assert.equal(testObj.FloatArray.Get(5), MIN_FLOAT, 'TArray<float> should be able to represent MIN_FLOAT');
        assert.ok(Math.abs(testObj.FloatArray.Get(5) - MIN_FLOAT) < 0.000000001e+38, 'Math.abs(testObj.FloatArray.Get(5) - MIN_FLOAT) should less than 0.000000001e+38');

        // MIN_FLOAT减去一个较小的数值后溢出
        testObj.FloatArray.Add(MIN_FLOAT - 0.0000002e+38);
        assert.equal(testObj.FloatArray.IsValidIndex(6), true);
        assert.equal(testObj.FloatArray.Get(6), -Infinity, 'MIN_FLOAT - 0.0000002e+38 should overflow');

        // MIN_FLOAT+MIN_FLOAT对float而言是-Infinity，对ECMAScript Number而言则不是
        testObj.FloatArray.Add(MIN_FLOAT + MIN_FLOAT);
        assert.equal(testObj.FloatArray.IsValidIndex(7), true);
        assert.equal(testObj.FloatArray.Get(7), -Infinity, 'MIN_FLOAT + MIN_FLOAT should be -Infinity for float number');
        assert.notEqual(MIN_FLOAT + MIN_FLOAT, -Infinity, 'MIN_FLOAT + MIN_FLOAT should not be Infinity for double number(ECMAScript Number)');
    });
});

describe('Test TArray<double>', function() {
    it('Add boundary values to the double array', function() {
        testObj.DoubleArray.Empty();
        assert.equal(testObj.DoubleArray.Num(), 0);

        // double能呈现MAX_VALUE（1.7976931348623157e+308，双精度浮点数最大值）
        const MAX_VALUE = Number.MAX_VALUE;
        testObj.DoubleArray.Add(MAX_VALUE);
        assert.equal(testObj.DoubleArray.IsValidIndex(0), true);
        assert.equal(testObj.DoubleArray.Get(0), MAX_VALUE, 'TArray<double> should be able represent MAX_VALUE');

        // MAX_VALUE加一个较小的数值后得到Infinity
        const MAX_VALUE_CONST = 1.7976931348623157e+308;
        assert.equal(MAX_VALUE_CONST, MAX_VALUE);
        assert.equal(MAX_VALUE_CONST + 0.0000000000000001e+308, Number.POSITIVE_INFINITY, 'MAX_VALUE_CONST should be the biggest valid double number');

        // double能呈现MIN_VALUE（注：此处使用的并不是Number.MIN_VALUE，Number.MIN_VALUE是Number能表示的最小正值，而非最小值）
        const MIN_VALUE = -1 * MAX_VALUE;
        testObj.DoubleArray.Add(MIN_VALUE);
        assert.equal(testObj.DoubleArray.IsValidIndex(1), true);
        assert.equal(testObj.DoubleArray.Get(1), MIN_VALUE, 'TArray<double> should be able represent MIN_VALUE');

        // MIN_VALUE减去一个较小的数值后得到-Infinity
        const MIN_VALUE_CONST = -1.7976931348623157e+308;
        assert.equal(MIN_VALUE_CONST, MIN_VALUE);
        assert.equal(MIN_VALUE_CONST - 0.0000000000000001e+308, Number.NEGATIVE_INFINITY, 'MIN_VALUE_CONST should be the smallest valid double number');
    });
});

describe('Test TArray<bool>', function() {
    it('Add values to bool array', function() {
        testObj.BoolArray.Empty();
        assert.equal(testObj.BoolArray.Num(), 0);

        testObj.BoolArray.Add(false);
        assert.equal(testObj.BoolArray.IsValidIndex(0), true);
        assert.equal(testObj.BoolArray.Get(0), false);

        testObj.BoolArray.Add(true);
        assert.equal(testObj.BoolArray.IsValidIndex(1), true);
        assert.equal(testObj.BoolArray.Get(1), true);

        assert.equal(testObj.BoolArray.Num(), 2);

        assert.equal(testObj.BoolArray.IsValidIndex(0), true);
        assert.equal(testObj.BoolArray.Get(0), false);
    });
});

describe('Test TArray<EnumInt32>', function() {
    it('Add values to the enum(int32) array', function() {
        testObj.EnumInt32Array.Empty();
        assert.equal(testObj.EnumInt32Array.Num(), 0);

        // 测试枚举值
        testObj.EnumInt32Array.Add(UE.EnumInt32.V0);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(0), true);
        assert.equal(testObj.EnumInt32Array.Get(0), UE.EnumInt32.V0);

        testObj.EnumInt32Array.Add(UE.EnumInt32.V1);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(1), true);
        assert.equal(testObj.EnumInt32Array.Get(1), UE.EnumInt32.V1);

        testObj.EnumInt32Array.Add(UE.EnumInt32.V2);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(2), true);
        assert.equal(testObj.EnumInt32Array.Get(2), UE.EnumInt32.V2);

        testObj.EnumInt32Array.Add(UE.EnumInt32.V3);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(3), true);
        assert.equal(testObj.EnumInt32Array.Get(3), UE.EnumInt32.V3);

        testObj.EnumInt32Array.Add(UE.EnumInt32.EnumInt32_MAX);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(4), true);
        assert.equal(testObj.EnumInt32Array.Get(4), UE.EnumInt32.EnumInt32_MAX, 'EnumInt32_MAX should be valid (no overflow)');

        // 测试枚举值（负数）
        testObj.EnumInt32Array.Add(UE.EnumInt32.VM1);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(5), true);
        assert.equal(testObj.EnumInt32Array.Get(5), UE.EnumInt32.VM1);
        assert.equal(testObj.EnumInt32Array.Get(5), -1);

        // 测试枚举值之外的值
        testObj.EnumInt32Array.Add(1111);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(6), true);
        assert.equal(testObj.EnumInt32Array.Get(6), 1111);

        testObj.EnumInt32Array.Add(-1111);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(7), true);
        assert.equal(testObj.EnumInt32Array.Get(7), -1111);
    });
    it('Test EnumInt32_MAX', function() {
        testObj.EnumInt32Array.Empty();
        assert.equal(testObj.EnumInt32Array.Num(), 0);

        testObj.EnumInt32Array.Add(UE.EnumInt32.VM1);
        testObj.EnumInt32Array.Add(UE.EnumInt32.V0);
        testObj.EnumInt32Array.Add(UE.EnumInt32.V1);
        testObj.EnumInt32Array.Add(UE.EnumInt32.V2);
        testObj.EnumInt32Array.Add(UE.EnumInt32.V3);
        for (let i = 0; i < testObj.EnumInt32Array.Num(); ++i) {
            assert.ok(testObj.EnumInt32Array.Get(i) < UE.EnumInt32.EnumInt32_MAX, 'Should less than UE.EnumInt32.EnumInt32_MAX');
        }
    });
    it('Test overflow in enum(int32) array', function() {
        testObj.EnumInt32Array.Empty();
        assert.equal(testObj.EnumInt32Array.Num(), 0);

        const INT32_MAX = Math.pow(2, 31) - 1;
        const INT32_MIN = Math.pow(2, 31) * -1;

        // 枚举最大值
        testObj.EnumInt32Array.Add(INT32_MAX);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(0), true);
        assert.equal(testObj.EnumInt32Array.Get(0), INT32_MAX, 'Enum(int32) should be able to represent INT32_MAX');

        // 枚举溢出
        testObj.EnumInt32Array.Add(INT32_MAX + 1);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(1), true);
        assert.equal(testObj.EnumInt32Array.Get(1), INT32_MIN, 'EnumInt32_MAX + 1 should be INT32_MIN(overflow)');

        // 枚举最小值
        testObj.EnumInt32Array.Add(INT32_MIN);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(2), true);
        assert.equal(testObj.EnumInt32Array.Get(2), INT32_MIN, 'Enum(int32) should be able to represent INT32_MIN');
        
        // 枚举溢出
        testObj.EnumInt32Array.Add(INT32_MIN - 1);
        assert.equal(testObj.EnumInt32Array.IsValidIndex(3), true);
        assert.equal(testObj.EnumInt32Array.Get(3), INT32_MAX, 'INT32_MIN + 1 should be INT32_MAX(overflow)');
    });
});

describe('Test TArray<EnumInt8Min>', function() {
    it('Test overflow', function() {
        testObj.EnumInt8MinArray.Empty();
        assert.equal(testObj.EnumInt8MinArray.Num(), 0);

        const INT8_MAX = Math.pow(2, 7) - 1;
        const INT8_MIN = Math.pow(2, 7) * -1;
        assert.equal(INT8_MIN, UE.EnumInt8Min.VINT8_MIN);

        testObj.EnumInt8MinArray.Add(INT8_MIN - 1);
        assert.equal(testObj.EnumInt8MinArray.IsValidIndex(0), true);
        assert.equal(testObj.EnumInt8MinArray.Get(0), INT8_MAX, '(INT8_MIN - 1) should be overflow');

        assert.equal(UE.EnumInt8Min.VINT8_MIN + 1, UE.EnumInt8Min.VINT8_MAX);
    });
});

describe('Test TArray<EnumInt8Max>', function() {
    it('Test overflow', function() {
        testObj.EnumInt8MaxArray.Empty();
        assert.equal(testObj.EnumInt8MaxArray.Num(), 0);

        const INT8_MAX = Math.pow(2, 7) - 1;
        const INT8_MIN = Math.pow(2, 7) * -1;
        assert.equal(INT8_MAX, UE.EnumInt8Max.VINT8_MAX);

        testObj.EnumInt8MaxArray.Add(INT8_MAX + 1);
        assert.equal(testObj.EnumInt8MaxArray.IsValidIndex(0), true);
        assert.equal(testObj.EnumInt8MaxArray.Get(0), INT8_MIN, '(INT8_MAX + 1) should be overflow');
    });
});

function TestStringLikeArray(Array: any) {
    Array.Empty();
    assert.equal(Array.Num(), 0);

    // 随便添加两个字符串
    const STR_1 = 'The First String';
    Array.Add(STR_1);
    assert.equal(Array.IsValidIndex(0), true);
    assert.equal(Array.Get(0), STR_1);

    const STR_2 = 'The Second String';
    Array.Add(STR_2);
    assert.equal(Array.IsValidIndex(1), true);
    assert.equal(Array.Get(1), STR_2);

    // 修改索引1处的字符串
    const STR_3 = Array.Get(1) + ': Say Hello World!';
    Array.Set(1, STR_3);
    assert.equal(Array.Num(), 2);
    assert.equal(Array.IsValidIndex(1), true);
    assert.equal(Array.Get(1), STR_3);

    // utf8
    const URF8_STR = '中文 español Deutsch English देवनागरी العربية português বাংলা русский 日本語 norsk bokmål ਪੰਜਾਬੀ 한국어 தமிழ் עברית';
    Array.Add(URF8_STR);
    assert.equal(Array.IsValidIndex(2), true);
    assert.equal(Array.Get(2), URF8_STR, 'utf8 should works');

    // template literals
    let who = 'Martin';
    Array.Add(`hello ${who}`);
    assert.equal(Array.IsValidIndex(3), true);
    assert.equal(Array.Get(3), 'hello ' + who, 'template literals should works');
}

function TestEmptyString(Array: any) {
    Array.Empty();

    // 空字符串
    Array.Add('');
    assert.equal(Array.IsValidIndex(0), true);
    assert.equal(Array.Get(0), '', 'should be empty string');
    assert.equal(Array.Get(0).concat('This string is 29-byte length').length, 29);
}

describe('Test TArray<FString>', function() {
    it('Test normal use', function() {
        TestStringLikeArray(testObj.FStringArray);
        TestEmptyString(testObj.FStringArray);
    });
});

describe('Test TArray<FText>', function() {
    it('Test normal use', function() {
        TestStringLikeArray(testObj.FTextArray);
        TestEmptyString(testObj.FStringArray);
    });
});

describe('Test TArray<FName>', function() {
    it('Test normal use', function() {
        TestStringLikeArray(testObj.FNameArray);

        // 空字符串（FName为空时，值为'None'）
        testObj.FNameArray.Empty();
        testObj.FNameArray.Add('');
        assert.equal(testObj.FNameArray.IsValidIndex(0), true);
        assert.equal(testObj.FNameArray.Get(0), 'None', 'should be empty string');
    });
});

// 其他元素类型的Array
// （UScriptStruct、UClass、UObject、UInterface。UE到JS的类型对应关系见FPropertyTranslator::Create）
// （还有复合类型，Array内嵌Array等，也就是元素类型为UScriptArray）

// 其他容器

describe('Test fix size array int32[]', function() {
    let arrayNum;
    it('Num', function() {
        arrayNum = testObj.Int32FixSizeArray.Num();
        assert.equal(arrayNum, 1024);
    });
    it('Add & Get', function() {
        for (let i = 0; i < arrayNum; ++i) {
            testObj.Int32FixSizeArray.Set(i, i);
        }
        for (let i = 0; i < arrayNum; ++i) {
            assert.equal(testObj.Int32FixSizeArray.Get(i), i);
        }
    });
    it('Error suitation', function() {
        // // TODO - 使用assert获取异常
        // testObj.Int32FixSizeArray.Get(-1);
        // testObj.Int32FixSizeArray.Get(arrayNum);
        // testObj.Int32FixSizeArray.Set(-1, -1);
        // testObj.Int32FixSizeArray.Set(1024, 1024);
    });
});

describe('Test Int32Set', function() {
    it('Num', function() {
        assert.equal(testObj.Int32Set.Num(), 0, 'Size of the empty set should be 0');
        // TODO - 补充一个已被初始化的set的情形
    });
    it('Add', function() {
        // 加入非重复的值
        testObj.Int32Set.Add(0);
        testObj.Int32Set.Add(1);
        testObj.Int32Set.Add(2);
        assert.equal(testObj.Int32Set.Num(), 3, 'After adding 3 different keys, the size of set should 3');

        // 加入重复的值
        testObj.Int32Set.Add(0);
        testObj.Int32Set.Add(1);
        testObj.Int32Set.Add(2);
        assert.equal(testObj.Int32Set.Num(), 3, 'Adding keys that already in the set should not change the size');
    });
    it('Empty', function() {
        testObj.Int32Set.Empty();
        assert.equal(testObj.Int32Set.Num(), 0, 'After emptying, the num of the set should be 0');

        // 把key加回来
        testObj.Int32Set.Add(0);
        testObj.Int32Set.Add(1);
        testObj.Int32Set.Add(2);
        assert.equal(testObj.Int32Set.Num(), 3, 'After adding 3 different keys, the size of set should 3');
    });
    it('Contains', function() {
        // 判断不在Set中的值
        assert.equal(testObj.Int32Set.Contains(-1), false, 'Check a nonexistent key should return false');

        // 判断在Set中的值
        assert.equal(testObj.Int32Set.Contains(0), true);
        assert.equal(testObj.Int32Set.Contains(1), true);
        assert.equal(testObj.Int32Set.Contains(2), true);
    });
    it('FindIndex', function() {
        // 寻找不在Set中的值的索引
        assert.equal(testObj.Int32Set.FindIndex(-1), -1, 'The index of a nonexistent key should be -1');

        // 寻找在Set中的值的索引
        assert.notEqual(testObj.Int32Set.FindIndex(0), -1);
        assert.notEqual(testObj.Int32Set.FindIndex(1), -1);
        assert.notEqual(testObj.Int32Set.FindIndex(2), -1);
    });
    it('GetMaxIndex', function() {
        assert.ok(testObj.Int32Set.GetMaxIndex() > 0, 'The max index of a nonempty set should greater than 0');

        // assert.equal(testObj.Int32Set.GetMaxIndex(), testObj.Int32Set.Num(), 'The max index of current set should be its num');
    });
    it('IsValidIndex', function() {
        // 判断Set中的key的index，应为合法
        let index0 = testObj.Int32Set.FindIndex(0);
        assert.equal(testObj.Int32Set.IsValidIndex(index0), true);
        let index1 = testObj.Int32Set.FindIndex(1);
        assert.equal(testObj.Int32Set.IsValidIndex(index1), true);
        let index2 = testObj.Int32Set.FindIndex(2);
        assert.equal(testObj.Int32Set.IsValidIndex(index2), true);

        // 判断-1（即不在Set中的key的索引），应为非法
        assert.equal(testObj.Int32Set.IsValidIndex(-1), false);

        // 判断大于等于MaxIndex，应为非法（？）
        const MAXINDEX = testObj.Int32Set.GetMaxIndex();
        assert.equal(testObj.Int32Set.IsValidIndex(MAXINDEX), false);
        assert.equal(testObj.Int32Set.IsValidIndex(MAXINDEX + 1), false);
    });
    it('RemoveAt', function() {
        // 取中间索引值，移除对应的key
        let index0 = testObj.Int32Set.FindIndex(0);
        let index1 = testObj.Int32Set.FindIndex(1);
        let index2 = testObj.Int32Set.FindIndex(2);
        let small = index0; // 因为此时Set的值依此为0、1、2，索引值也一样，所以直接设置
        let mid = index1;
        let big = index2;

        const OLD_MAXINDEX = testObj.Int32Set.GetMaxIndex();
        const OLD_NUM = testObj.Int32Set.Num();

        // 移除已有的值，Num应该减小
        testObj.Int32Set.RemoveAt(mid);  // TODO - 使用assert期望不抛出异常
        assert.equal(testObj.Int32Set.Num(), OLD_NUM - 1, 'After removing one key the size of set should decrease 1');

        // 移除中间index的一个值后，MaxIndex应该保持不变
        assert.equal(testObj.Int32Set.GetMaxIndex(), OLD_MAXINDEX, 'After removing one key the max index of the set should be the same');

        // 被移除的index，IsValidIndex返回false，其余index仍为true
        for (let i = 0; i < OLD_MAXINDEX; ++i) {
            if (i == mid) {
                assert.equal(testObj.Int32Set.IsValidIndex(i), false, 'The only index of the removed key should be invalid');
            }
            else {
                assert.equal(testObj.Int32Set.IsValidIndex(i), true);
            }
        }

        // 移除最大的index，GetMaxIndex也不变
        testObj.Int32Set.RemoveAt(big);
        assert.equal(testObj.Int32Set.Num(), OLD_NUM - 2);
        assert.equal(testObj.Int32Set.GetMaxIndex(), OLD_MAXINDEX);

        // 移除所有值后，GetMaxIndex也不变
        testObj.Int32Set.RemoveAt(small);
        assert.equal(testObj.Int32Set.Num(), 0);
        assert.equal(testObj.Int32Set.GetMaxIndex(), OLD_MAXINDEX);

        // 只有调用Empty，GetMaxIndex才变为0
        testObj.Int32Set.Empty();
        assert.equal(testObj.Int32Set.GetMaxIndex(), 0);
    });
    it('Get', function() {
        // 清空后再加值
        testObj.Int32Set.Empty();
        assert.equal(testObj.Int32Set.Num(), 0);

        testObj.Int32Set.Add(0);
        testObj.Int32Set.Add(1);
        testObj.Int32Set.Add(2);
        assert.equal(testObj.Int32Set.Num(), 3);
        const OLD_NUM = testObj.Int32Set.Num();

        // 以存在于Set中的key的索引为参数
        let index0 = testObj.Int32Set.FindIndex(0);
        let index1 = testObj.Int32Set.FindIndex(1);
        let index2 = testObj.Int32Set.FindIndex(2);
        assert.equal(testObj.Int32Set.Get(index0), 0);
        assert.equal(testObj.Int32Set.Get(index1), 1);
        assert.equal(testObj.Int32Set.Get(index2), 2);

        // 以-1为参数（抛异常）
        // testObj.Int32Set.Get(-1);   // TODO - 使用assert预期异常

        // 以不存在于Set中的key的索引为参数（抛异常）
        // testObj.Int32Set.Get(testObj.Int32Set.GetMaxIndex());

        testObj.Int32Set.RemoveAt(index0);
        assert.equal(testObj.Int32Set.Num(), OLD_NUM - 1);
        // 移除原本的key后，Get对应index（抛异常）
        // testObj.Int32Set.Get(index0);
    });
});

describe('Test Int32ToStrMap', function() {
    it('Num', function() {
        assert.equal(testObj.Int32ToStrMap.Num(), 0, 'Size of the empty map is 0');
        // TODO - 增加对非空map的num判断
    });
    it('Add', function() {
        testObj.Int32ToStrMap.Add(0, 'zero');
        testObj.Int32ToStrMap.Add(1, 'one');
        testObj.Int32ToStrMap.Add(2, 'two');
        assert.equal(testObj.Int32ToStrMap.Num(), 3);

        // 加入已有的kv
        testObj.Int32ToStrMap.Add(0, 'zero');
        testObj.Int32ToStrMap.Add(1, 'one');
        testObj.Int32ToStrMap.Add(2, 'two');
        assert.equal(testObj.Int32ToStrMap.Num(), 3);
    });
    it('Get', function() {
        // 获取已有的kv
        assert.equal(testObj.Int32ToStrMap.Get(0), 'zero');
        assert.equal(testObj.Int32ToStrMap.Get(1), 'one');
        assert.equal(testObj.Int32ToStrMap.Get(2), 'two');

        // 获取不存在的kv
        assert.equal(testObj.Int32ToStrMap.Get(3), undefined, 'Getting an undefined key should returns undefined');
    });
    it('Set', function() {
        // 更改kv值
        testObj.Int32ToStrMap.Set(0, 'zero_zero');
        testObj.Int32ToStrMap.Set(1, 'one_one');
        testObj.Int32ToStrMap.Set(2, 'two_two');

        assert.equal(testObj.Int32ToStrMap.Num(), 3);
        assert.equal(testObj.Int32ToStrMap.Get(0), 'zero_zero');
        assert.equal(testObj.Int32ToStrMap.Get(1), 'one_one');
        assert.equal(testObj.Int32ToStrMap.Get(2), 'two_two');

        // 实际上Add函数也可以
        testObj.Int32ToStrMap.Add(0, 'zero');
        testObj.Int32ToStrMap.Add(1, 'one');
        testObj.Int32ToStrMap.Add(2, 'two');

        assert.equal(testObj.Int32ToStrMap.Num(), 3);
        assert.equal(testObj.Int32ToStrMap.Get(0), 'zero');
        assert.equal(testObj.Int32ToStrMap.Get(1), 'one');
        assert.equal(testObj.Int32ToStrMap.Get(2), 'two');
    });
    it('Remove', function() {
        // 移除一个Map中的kv
        const OLD_NUM = testObj.Int32ToStrMap.Num();
        testObj.Int32ToStrMap.Remove(0);
        assert.equal(testObj.Int32ToStrMap.Num(), OLD_NUM - 1);

        // 移除Map中不存在的kv
        // testObj.Int32ToStrMap.Remove(0); // TODO - 使用assert预期异常

        // 获取已移除的key
        assert.equal(testObj.Int32ToStrMap.Get(0), undefined);

        // 把已移除的kv加回去
        testObj.Int32ToStrMap.Add(0, 'zero');
        assert.equal(testObj.Int32ToStrMap.Num(), OLD_NUM);
        assert.equal(testObj.Int32ToStrMap.Get(0), 'zero');
    });
    it('Empty', function() {
        // 清空
        testObj.Int32ToStrMap.Empty();
        assert.equal(testObj.Int32ToStrMap.Num(), 0);

        // 访问旧kv均为undefined
        assert.equal(testObj.Int32ToStrMap.Get(0), undefined);
        assert.equal(testObj.Int32ToStrMap.Get(1), undefined);
        assert.equal(testObj.Int32ToStrMap.Get(2), undefined);
    });
    it('GetMaxIndex', function() {
        // 空的容器最大索引应该为0
        assert.equal(testObj.Int32ToStrMap.GetMaxIndex(), 0);
        
        // 加入三个kv
        testObj.Int32ToStrMap.Add(0, 'zero');
        testObj.Int32ToStrMap.Add(5, 'five');
        testObj.Int32ToStrMap.Add(10, 'ten');
        assert.equal(testObj.Int32ToStrMap.Num(), 3);

        // GetMaxIndex获取的是kv的最大索引+1
        assert.equal(testObj.Int32ToStrMap.GetMaxIndex(), 3, 'The max index of the current map should be 3(there are only three key-value pairs');

        // 移除中间的kv，最大索引不变
        testObj.Int32ToStrMap.Remove(5);
        assert.equal(testObj.Int32ToStrMap.Num(), 2);
        assert.equal(testObj.Int32ToStrMap.GetMaxIndex(), 3);

        // 移除最后加入的kv，最大索引不变
        testObj.Int32ToStrMap.Remove(10);
        assert.equal(testObj.Int32ToStrMap.Num(), 1);
        assert.equal(testObj.Int32ToStrMap.GetMaxIndex(), 3);

        // 移除唯一的一个，最大索引不变
        testObj.Int32ToStrMap.Remove(0);
        assert.equal(testObj.Int32ToStrMap.Num(), 0);
        assert.equal(testObj.Int32ToStrMap.GetMaxIndex(), 3);

        // 只有调用了Empty，最大索引才会变为0
        testObj.Int32ToStrMap.Empty();
        assert.equal(testObj.Int32ToStrMap.Num(), 0);
        assert.equal(testObj.Int32ToStrMap.GetMaxIndex(), 0);
    });
    it('IsValidIndex', function() {
        // 加入三个kv
        testObj.Int32ToStrMap.Add(0, 'zero');   // 索引0
        testObj.Int32ToStrMap.Add(5, 'five');   // 索引1
        testObj.Int32ToStrMap.Add(10, 'ten');   // 索引2
        assert.equal(testObj.Int32ToStrMap.Num(), 3);

        for (let i = 0; i < testObj.Int32ToStrMap.GetMaxIndex(); ++i) {
            assert.equal(testObj.Int32ToStrMap.IsValidIndex(i), true);
        }

        // 被移除的kv，其原本的index变为非法索引
        testObj.Int32ToStrMap.Remove(5);
        assert.equal(testObj.Int32ToStrMap.Num(), 2);
        for (let i = 0; i < testObj.Int32ToStrMap.GetMaxIndex(); ++i) {
            if (i == 1) {
                assert.equal(testObj.Int32ToStrMap.IsValidIndex(i), false);
            } else {
                assert.equal(testObj.Int32ToStrMap.IsValidIndex(i), true);
            }
        }
    });
    it('GetKey', function() {
        testObj.Int32ToStrMap.Empty();
        assert.equal(testObj.Int32ToStrMap.Num(), 0);

        // 加入三个kv
        testObj.Int32ToStrMap.Add(0, 'zero');   // 索引0
        testObj.Int32ToStrMap.Add(5, 'five');   // 索引1
        testObj.Int32ToStrMap.Add(10, 'ten');   // 索引2
        assert.equal(testObj.Int32ToStrMap.Num(), 3);

        // 获取index对应的key
        assert.equal(testObj.Int32ToStrMap.GetKey(0), 0);
        assert.equal(testObj.Int32ToStrMap.GetKey(1), 5);
        assert.equal(testObj.Int32ToStrMap.GetKey(2), 10);

        // 获取非法index对应的key
        // testObj.Int32ToStrMap.GetKey(testObj.Int32ToStrMap.GetMaxIndex());  // TODO - 用assert期望异常
    });
});

describe('Test FStringSet', function() {
    it('Add some keys', function() {
        testObj.FStringSet.Empty();
        assert.equal(testObj.FStringSet.Num(), 0);

        testObj.FStringSet.Add('One');
        testObj.FStringSet.Add('Two');
        testObj.FStringSet.Add('Three');
        assert.equal(testObj.FStringSet.Num(), 3);

        // FString的hash，大小写不敏感
        testObj.FStringSet.Add('one');
        testObj.FStringSet.Add('two');
        testObj.FStringSet.Add('three');
        // assert.equal(testObj.FStringSet.Num(), 6);
        assert.equal(testObj.FStringSet.Num(), 3);

        assert.equal(testObj.FStringSet.Contains('One'), true);
        assert.equal(testObj.FStringSet.Contains('one'), true);
        assert.equal(testObj.FStringSet.Contains('Two'), true);
        assert.equal(testObj.FStringSet.Contains('two'), true);
        assert.equal(testObj.FStringSet.Contains('Three'), true);
        assert.equal(testObj.FStringSet.Contains('three'), true);
    });
});

describe('Test StrToStrMap', function() {
    it('Add some key-value pairs', function() {
        testObj.StrToStrMap.Empty();
        assert.equal(testObj.StrToStrMap.Num(), 0);

        // 加三个kv
        testObj.StrToStrMap.Add('One', 'one_one');
        testObj.StrToStrMap.Add('Two', 'two_two');
        testObj.StrToStrMap.Add('Three', 'three_three');
        assert.equal(testObj.StrToStrMap.Num(), 3);

        // FString的hash，大小写不敏感
        assert.equal(testObj.StrToStrMap.Get('one'), 'one_one');
        assert.equal(testObj.StrToStrMap.Get('two'), 'two_two');
        assert.equal(testObj.StrToStrMap.Get('three'), 'three_three');
    });
});

/*
 * 测试访问UE对象，属性、方法：{简单类型参数方法、复杂类型参数方法、引用类型参数方法、静态类型、扩展方法}*{带返回值、不带返回值}
 */

/*
 * 引擎方法
 */

/*
 * Delegate
 */

