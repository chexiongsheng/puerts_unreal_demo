import * as UE from 'ue'
import {argv, makeUClass, blueprint} from 'puerts';

let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();

//JS继承一个原生类
class MyActor extends UE.Actor {
    tickCount: number;

    //注意，继承UE类的js类，构造函数必须大写开头
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        console.log("this.Add", this.Add(33, 44));
        this.tickCount = 0;
    }

    //override 1
    ReceiveBeginPlay(): void {
        console.log("ReceiveBeginPlay");
        console.log("this.Add", this.Add(55, 66));
    }

    Add(a: number, b: number): number {
        return a + b;
    }

    //override 2
    ReceiveTick(DeltaSeconds: number): void {
        if (this.tickCount % 100 == 0 && this.tickCount <= 200) {
            console.log("MyActor.ReceiveTick", DeltaSeconds, this.tickCount);
        }
        ++this.tickCount;
    }
}

//注意：makeUClass已经废弃，不推荐使用，而且功能也很有限，比如不支持rpc，建议使用mixin或者ts继承ue类功能
let cls = makeUClass(MyActor);
world.SpawnActor(cls, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.Actor;

let ucls = UE.Class.Load('/Game/StarterContent/TestBlueprint.TestBlueprint_C');

//TestBlueprint是根据ucls生成的类，两者需要声明周期保持同步，慎防只拿着TestBlueprint用，ucls释放了，然后进而这个蓝图被UE给GC了
const TestBlueprint = blueprint.tojs<typeof UE.Game.StarterContent.TestBlueprint.TestBlueprint_C>(ucls);

class MyBPActor extends TestBlueprint {
    //覆盖蓝图提供的方法，此时无论是蓝图在BeginPlay的调用，以及在ts侧的调用，都会用这个新的实现
    Foo(P1: boolean, P2: number, P3: number): void {
        console.log(">>>>>>>>>>>>>>>>>>>>", P1 ? P2 : P3);
    }
}

let clsBP = makeUClass(MyBPActor);
let bpActor2 =  world.SpawnActor(clsBP, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.Game.StarterContent.TestBlueprint.TestBlueprint_C;
bpActor2.Foo(false, 8000, 9000);
