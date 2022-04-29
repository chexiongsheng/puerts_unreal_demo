import * as UE from 'ue'
import {argv, blueprint} from 'puerts';

let ucls = UE.Class.Load('/Game/StarterContent/TestBlueprint.TestBlueprint_C');

//TestBlueprint是根据ucls生成的类，两者需要声明周期保持同步，慎防只拿着TestBlueprint用，ucls释放了，然后进而这个蓝图被UE给GC了
const TestBlueprint = blueprint.tojs<typeof UE.Game.StarterContent.TestBlueprint.TestBlueprint_C>(ucls);

class Fooable {
    //不注释后可以接收到ReceiveBeginPlay回调
    //ReceiveBeginPlay():void {
    //    console.log(`Ts ReceiveBeginPlay 1 + 3 = ${this.TsAdd(1, 3)}`);
    //}

    //可以覆盖蓝图对应的函数
    Foo(P1: boolean, P2: number, P3: number): void {
        console.log(this.GetName(), "Foo", P1 ? P2 : P3);
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
    //2、blueprint.mixin参数3，objectTakeByNative传true，
    //   这个方式脚本对象的生命周期会由UE管理，在脚本持有该
    //   对象不会阻止UE GC对对应蓝图对象的回收
    //tsdata: number;
}

//这句可以让Fooable能调用到TestBlueprint_C其它方法
interface Fooable extends UE.Game.StarterContent.TestBlueprint.TestBlueprint_C {};

const TestBlueprintWithMixin = blueprint.mixin(TestBlueprint, Fooable);

let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();

world.SpawnActor(TestBlueprintWithMixin.StaticClass(), undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined);

//let o = new TestBlueprintWithMixin();

