"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts");
let ucls = UE.Class.Load('/Game/StarterContent/TestBlueprint.TestBlueprint_C');
//TestBlueprint是根据ucls生成的类，两者需要声明周期保持同步，慎防只拿着TestBlueprint用，ucls释放了，然后进而这个蓝图被UE给GC了
const TestBlueprint = puerts_1.blueprint.tojs(ucls);
class Fooable {
    //不注释后可以接收到ReceiveBeginPlay回调
    //ReceiveBeginPlay():void {
    //    console.log(`Ts ReceiveBeginPlay 1 + 3 = ${this.TsAdd(1, 3)}`);
    //}
    //可以覆盖蓝图对应的函数
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
//参数二的mixin建议只包含函数
//如果mixin如果包括纯脚本字段，需要在脚本中保持对象引用，否则脚本侧数据会被gc
const TestBlueprintWithMixin = puerts_1.blueprint.mixin(TestBlueprint, Fooable);
let world = puerts_1.argv.getByName("GameInstance").GetWorld();
world.SpawnActor(TestBlueprintWithMixin.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined); // as InstanceType<typeof TestBlueprintWithMixin>;
//# sourceMappingURL=UsingMixin.js.map