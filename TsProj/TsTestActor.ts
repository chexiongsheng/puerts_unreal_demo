import * as UE from 'ue'

console.warn("Script init of TsTestActor ");

class TsTestActor extends UE.Actor {
    tickCount: number;

    actor: UE.Actor; 

    cls: UE.Class;

    b: boolean;

    int64_1: BigInt;

    int64_2: bigint;

    str : string;

    v : UE.Vector;

    map: UE.TMap<string, number>;

    arr: UE.TArray<UE.Object>;

    set: UE.TSet<string>;

    //注意，继承UE类的js类，构造函数必须大写开头
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        console.warn("TsTestActor.Constructor this.Add", this.Add(33, 44));
        this.tickCount = 0;
    }

    //override 1
    ReceiveBeginPlay(): void {
        console.warn("TsTestActor.ReceiveBeginPlay this.Add", this.Add(55, 66));
    }

    Add(a: number, b: number): number {
        return a + b;
    }

    GetActor() : UE.Actor {
        return this.actor;
    }

    SetActor(p: UE.Actor) : void {
        this.actor = p;
    }

    GetArray() : UE.TArray<UE.Object> {
        return this.arr;
    }

    SetArray(p: UE.TArray<UE.Object>): void {
        this.arr = p;
    }

    GetMap() :UE.TMap<string, number> {
        return this.map;
    }

    //override 2
    ReceiveTick(DeltaSeconds: number): void {
        if (this.tickCount % 100 == 0) {
            console.warn("TsTestActor.ReceiveTick", DeltaSeconds, this.tickCount);
        }
        ++this.tickCount;
    }
}

export default TsTestActor;

