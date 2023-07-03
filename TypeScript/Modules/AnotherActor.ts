import * as UE from 'ue'

class AnotherActor extends UE.Actor {
    //注意，继承UE类的js类，构造函数必须大写开头
    Constructor() {
        console.warn("AnotherActor.Constructor");
    }

    //override 1
    ReceiveBeginPlay(): void {
        console.warn("AnotherActor.ReceiveBeginPlay");
    }
}

export default AnotherActor;
