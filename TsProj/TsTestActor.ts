import * as UE from 'ue'

console.error("Script init of TsTestActor ");

class TsTestActor extends UE.Actor {
    tickCount: number;

    //注意，继承UE类的js类，构造函数必须大写开头
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        console.error("Constructor this.Add", this.Add(33, 44));
        this.tickCount = 0;
    }

    //override 1
    ReceiveBeginPlay(): void {
        console.error("ReceiveBeginPlay");
        console.error("ReceiveBeginPlay this.Add", this.Add(55, 66));
    }

    Add(a: number, b: number): number {
        return a + b;
    }

    //override 2
    ReceiveTick(DeltaSeconds: number): void {
        console.error("MyActor.ReceiveTick", DeltaSeconds, this.tickCount);
        if (this.tickCount % 100 == 0 && this.tickCount <= 200) {
            console.error("MyActor.ReceiveTick", DeltaSeconds, this.tickCount);
        }
        ++this.tickCount;
    }
}

export default TsTestActor;