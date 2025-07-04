"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts");
//-----------------------------------------------------------------
//基础演示
//-----------------------------------------------------------------
let ucls = UE.Class.Load('/Game/StarterContent/MixinTest.MixinTest_C');
//MixinTest是根据ucls生成的类，两者需要生命周期保持同步，慎防只拿着MixinTest用，ucls释放了，然后进而这个蓝图被UE给GC了
const MixinTest = puerts_1.blueprint.tojs(ucls);
;
class Loggable {
    //不注释后可以接收到ReceiveBeginPlay回调
    //ReceiveBeginPlay():void {
    //    console.log(`Ts ReceiveBeginPlay 1 + 3 = ${this.TsAdd(1, 3)}`);
    //}
    //可以覆盖蓝图对应的函数，函数签名和MixinTest_C声明的不兼容（不需要严格一致，能满足协变逆变要求即可）会报错
    Log(msg) {
        console.log(this.GetName(), msg);
        console.log(`1 + 3 = ${this.TsAdd(1, 3)}`);
    }
    //蓝图没有的纯Ts方法
    TsAdd(x, y) {
        console.log(`Ts Add(${x}, ${y})`);
        return x + y;
    }
}
const MixinTestWithMixin = puerts_1.blueprint.mixin(MixinTest, Loggable);
let gameInstance = puerts_1.argv.getByName("GameInstance");
let o = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(gameInstance, MixinTestWithMixin.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined);
UE.GameplayStatics.FinishSpawningActor(o, undefined);
o.Log("msg from ts");
//-----------------------------------------------------------------
//super关键字演示
//-----------------------------------------------------------------
let ucls_base = UE.Class.Load('/Game/StarterContent/MixinSuperTestBase.MixinSuperTestBase_C');
const MixinSuperTestBase = puerts_1.blueprint.tojs(ucls_base);
;
class MixinSuperTestBasePlaceHold {
}
Object.setPrototypeOf(MixinSuperTestBasePlaceHold.prototype, MixinSuperTestBase.prototype);
let ucls_child = UE.Class.Load('/Game/StarterContent/MixinSuperTestDerived.MixinSuperTestDerived_C');
const MixinSuperTestDerived = puerts_1.blueprint.tojs(ucls_child);
;
class DerivedClassMixin extends MixinSuperTestBasePlaceHold {
    Foo() {
        console.log("i am ts mixin");
        super.Foo();
    }
}
const MixinSuperTestDerivedWithMixin = puerts_1.blueprint.mixin(MixinSuperTestDerived, DerivedClassMixin);
let mixinActor = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(gameInstance, MixinSuperTestDerivedWithMixin.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined);
UE.GameplayStatics.FinishSpawningActor(mixinActor, undefined);
//-----------------------------------------------------------------
//原生类mixin演示
//-----------------------------------------------------------------
let obj = new UE.MainObject();
console.log('before mixin start....');
obj.Mult(1, 2);
obj.Div(4, 5);
console.log('before mixin end....');
class Calc {
    //声明为BlueprintNativeEvent的原生方法
    Mult(x, y) {
        console.log(`Ts Mult(${x}, ${y})`);
        return x * y;
    }
    //声明为BlueprintImplementableEvent的方法
    Div(x, y) {
        console.log(`Ts Div(${x}, ${y})`);
        return x / y;
    }
}
;
puerts_1.blueprint.mixin(UE.MainObject, Calc);
console.log('after mixin start....');
obj.Mult(1, 2);
obj.Div(4, 5);
console.log('after mixin end....');
//# sourceMappingURL=UsingMixin.js.map