import * as UE from 'ue'
import {rpc, edit_on_instance} from 'ue'
import {$InRef, $unref} from 'puerts'

console.warn("Script init of TsTestActor ");

class TsTestActor extends UE.Actor {
    tickCount: number;

    actor: UE.Actor; 

    cls: UE.Class;

    @edit_on_instance()
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

    SetArray(p: $InRef<UE.TArray<UE.Object>>): void {
        this.arr = $unref(p);
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

    //@cpp:text
    TestCppType(p1:number/*@cpp:int*/, p2:number/*@cpp:byte */): string {
        return p1 + ":" + p2;
    }

    //@cpp:name
    fname: string;

    namearr: UE.TArray<string/*@cpp:text*/>;

    //@no-blueprint
    TsOnlyMethod():void {

    }

    //@no-blueprint
    TsOnlyField: number;

    @rpc.flags(rpc.PropertyFlags.CPF_Net | rpc.PropertyFlags.CPF_RepNotify)
    @rpc.condition(rpc.ELifetimeCondition.COND_InitialOrOwner)
    dint: number;

    @rpc.flags(rpc.FunctionFlags.FUNC_Net | rpc.FunctionFlags.FUNC_NetClient)
    Fire(): void {

    }

    @rpc.flags(rpc.FunctionFlags.FUNC_Net | rpc.FunctionFlags.FUNC_NetServer)
    FireServer(): void {

    }

    OnRep_dint(): void {
        
    }

    e: UE.ETickingGroup;

    ea: UE.TArray<UE.ETickingGroup>;

    clsOfWidget: UE.TSubclassOf<UE.Widget>;

    softObject: UE.TSoftObjectPtr<UE.Actor>;

    softClass: UE.TSoftClassPtr<UE.Actor>;
}

export default TsTestActor;
