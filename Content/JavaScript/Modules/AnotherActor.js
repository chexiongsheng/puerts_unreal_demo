"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class AnotherActor extends UE.Actor {
    //注意，继承UE类的js类，构造函数必须大写开头
    Constructor() {
        console.warn("AnotherActor.Constructor");
    }
    //override 1
    ReceiveBeginPlay() {
        console.warn("AnotherActor.ReceiveBeginPlay");
    }
}
exports.default = AnotherActor;
//# sourceMappingURL=AnotherActor.js.map