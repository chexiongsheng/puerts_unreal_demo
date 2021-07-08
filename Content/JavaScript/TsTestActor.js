"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const ue_1 = require("ue");
console.warn("Script init of TsTestActor ");
class TsTestActor extends UE.Actor {
    //注意，继承UE类的js类，构造函数必须大写开头
    Constructor() {
        this.PrimaryActorTick.bCanEverTick = true;
        console.warn("TsTestActor.Constructor this.Add", this.Add(33, 44));
        this.tickCount = 0;
    }
    //override 1
    ReceiveBeginPlay() {
        console.warn("TsTestActor.ReceiveBeginPlay this.Add", this.Add(55, 66));
    }
    Add(a, b) {
        return a + b;
    }
    GetActor() {
        return this.actor;
    }
    SetActor(p) {
        this.actor = p;
    }
    GetArray() {
        return this.arr;
    }
    SetArray(p) {
        this.arr = p;
    }
    GetMap() {
        return this.map;
    }
    //override 2
    ReceiveTick(DeltaSeconds) {
        if (this.tickCount % 100 == 0) {
            console.warn("TsTestActor.ReceiveTick", DeltaSeconds, this.tickCount);
        }
        ++this.tickCount;
    }
    //@cpp:text
    TestCppType(p1 /*@cpp:int*/, p2 /*@cpp:byte */) {
        return p1 + ":" + p2;
    }
    //@no-blueprint
    TsOnlyMethod() {
    }
    Fire() {
    }
    FireServer() {
    }
    OnRep_dint() {
    }
}
__decorate([
    ue_1.edit_on_instance()
], TsTestActor.prototype, "b", void 0);
__decorate([
    ue_1.rpc.flags(ue_1.rpc.PropertyFlags.CPF_Net | ue_1.rpc.PropertyFlags.CPF_RepNotify),
    ue_1.rpc.condition(ue_1.rpc.ELifetimeCondition.COND_InitialOrOwner)
], TsTestActor.prototype, "dint", void 0);
__decorate([
    ue_1.rpc.flags(ue_1.rpc.FunctionFlags.FUNC_Net | ue_1.rpc.FunctionFlags.FUNC_NetClient)
], TsTestActor.prototype, "Fire", null);
__decorate([
    ue_1.rpc.flags(ue_1.rpc.FunctionFlags.FUNC_Net | ue_1.rpc.FunctionFlags.FUNC_NetServer)
], TsTestActor.prototype, "FireServer", null);
exports.default = TsTestActor;
//# sourceMappingURL=TsTestActor.js.map