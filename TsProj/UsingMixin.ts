import * as UE from 'ue'
import {argv, blueprint} from 'puerts';

//-----------------------------------------------------------------
//基础演示
//-----------------------------------------------------------------

let ucls = UE.Class.Load('/Game/StarterContent/MixinTest.MixinTest_C');

//MixinTest是根据ucls生成的类，两者需要生命周期保持同步，慎防只拿着MixinTest用，ucls释放了，然后进而这个蓝图被UE给GC了
const MixinTest = blueprint.tojs<typeof UE.Game.StarterContent.MixinTest.MixinTest_C>(ucls);


//这句可以让Loggable能调用到MixinTest_C其它方法
interface Loggable extends UE.Game.StarterContent.MixinTest.MixinTest_C {};

class Loggable {
    //不注释后可以接收到ReceiveBeginPlay回调
    //ReceiveBeginPlay():void {
    //    console.log(`Ts ReceiveBeginPlay 1 + 3 = ${this.TsAdd(1, 3)}`);
    //}

    //可以覆盖蓝图对应的函数，函数签名和MixinTest_C声明的不兼容（不需要严格一致，能满足协变逆变要求即可）会报错
    Log(msg:string): void {
        console.log(this.GetName(), msg);
        console.log(`1 + 3 = ${this.TsAdd(1, 3)}`);
    }

    //蓝图没有的纯Ts方法
    TsAdd(x : number, y: number): number {
        console.log(`Ts Add(${x}, ${y})`)
        return x + y;
    }

    //mixin建议只包含函数
    //如果mixin如果包括纯脚本字段，有两种方式（二选一）
    //1、需要在脚本中保持对象引用，否则脚本侧数据会被gc
    //2、blueprint.mixin参数3，config.objectTakeByNative传true，
    //   这个方式脚本对象的生命周期会由UE管理，在脚本持有该
    //   对象不会阻止UE GC对对应蓝图对象的回收
    //tsdata: number;
}

const MixinTestWithMixin = blueprint.mixin(MixinTest, Loggable);

let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();

let o = world.SpawnActor(MixinTestWithMixin.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as Loggable;
o.Log("msg from ts");

//-----------------------------------------------------------------
//super关键字演示
//-----------------------------------------------------------------

let ucls_base = UE.Class.Load('/Game/StarterContent/MixinSuperTestBase.MixinSuperTestBase_C');
const MixinSuperTestBase = blueprint.tojs<typeof UE.Game.StarterContent.MixinSuperTestBase.MixinSuperTestBase_C>(ucls_base);

//关键代码，建立个空类让mixin类继承，如果基类本身已经有mixin类，可以选择继承基类的mixin类
interface MixinSuperTestBasePlaceHold extends UE.Game.StarterContent.MixinSuperTestBase.MixinSuperTestBase_C {};
class MixinSuperTestBasePlaceHold {}
Object.setPrototypeOf(MixinSuperTestBasePlaceHold.prototype, MixinSuperTestBase.prototype);

let ucls_child = UE.Class.Load('/Game/StarterContent/MixinSuperTestDerived.MixinSuperTestDerived_C');

const MixinSuperTestDerived = blueprint.tojs<typeof UE.Game.StarterContent.MixinSuperTestDerived.MixinSuperTestDerived_C>(ucls_child);

interface DerivedClassMixin extends UE.Game.StarterContent.MixinSuperTestDerived.MixinSuperTestDerived_C {};

class DerivedClassMixin extends MixinSuperTestBasePlaceHold {
    Foo():void {
        console.log("i am ts mixin");
        super.Foo();
    }
}

const MixinSuperTestDerivedWithMixin = blueprint.mixin(MixinSuperTestDerived, DerivedClassMixin);
world.SpawnActor(MixinSuperTestDerivedWithMixin.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined)


//-----------------------------------------------------------------
//原生类mixin演示
//-----------------------------------------------------------------

let obj = new UE.MainObject();

console.log('before mixin start....')
obj.Mult(1, 2);
obj.Div(4, 5);
console.log('before mixin end....')

class Calc {
    //声明为BlueprintNativeEvent的原生方法
    Mult(x: number, y: number) : number
    {
        console.log(`Ts Mult(${x}, ${y})`)
        return x * y;
    }

    //声明为BlueprintImplementableEvent的方法
    Div(x: number, y: number) : number
    {
        console.log(`Ts Div(${x}, ${y})`)
        return x / y;
    }

}

interface Calc extends UE.MainObject {};

blueprint.mixin(UE.MainObject, Calc);

console.log('after mixin start....')
obj.Mult(1, 2);
obj.Div(4, 5);
console.log('after mixin end....')

