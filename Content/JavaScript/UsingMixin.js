"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts");
let ucls = UE.Class.Load('/Game/StarterContent/TestBlueprint.TestBlueprint_C');
//TestBlueprint是根据ucls生成的类，两者需要生命周期保持同步，慎防只拿着TestBlueprint用，ucls释放了，然后进而这个蓝图被UE给GC了
const TestBlueprint = puerts_1.blueprint.tojs(ucls);
class Fooable {
    //不注释后可以接收到ReceiveBeginPlay回调
    //ReceiveBeginPlay():void {
    //    console.log(`Ts ReceiveBeginPlay 1 + 3 = ${this.TsAdd(1, 3)}`);
    //}
    //可以覆盖蓝图对应的函数，函数签名和TestBlueprint_C声明的不兼容（不需要严格一致，能满足协变逆变要求即可）会报错
    Foo(P1, P2, P3) {
        console.log(this.GetName(), "Foo", P1 ? P2 : P3);
        console.log(`1 + 3 = ${this.TsAdd(1, 3)}`);
    }
    //蓝图没有的纯Ts方法
    TsAdd(x, y) {
        console.log(`Ts Add(${x}, ${y})`);
        return x + y;
    }
}
;
//返回mixin后ts类以及UClass，两者需要生命周期保持同步
const [TestBlueprintWithMixin, UClassMixin] = puerts_1.blueprint.mixin(TestBlueprint, Fooable);
let world = puerts_1.argv.getByName("GameInstance").GetWorld();
let o = world.SpawnActor(TestBlueprintWithMixin.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);
o.Foo(true, 1, 5);
//let o = new TestBlueprintWithMixin();
//# sourceMappingURL=UsingMixin.js.map