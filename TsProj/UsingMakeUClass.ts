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

let cls = makeUClass(MyActor);
world.SpawnActor(cls, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.Actor;

//JS继承一个蓝图类
//!！注意：blueprint<xxx>会导致这个BP类常驻内存
const TestBlueprint = blueprint<typeof UE.TestBlueprint_C>('/Game/StarterContent/TestBlueprint.TestBlueprint_C');
class MyBPActor extends TestBlueprint {
    //覆盖蓝图提供的方法，此时无论是蓝图在BeginPlay的调用，以及在ts侧的调用，都会用这个新的实现
    Foo(P1: boolean, P2: number, P3: number): void {
        console.log(">>>>>>>>>>>>>>>>>>>>", P1 ? P2 : P3);
    }
}
let clsBP = makeUClass(MyBPActor);
let bpActor2 =  world.SpawnActor(clsBP, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, undefined, undefined) as UE.TestBlueprint_C;
bpActor2.Foo(false, 8000, 9000);
