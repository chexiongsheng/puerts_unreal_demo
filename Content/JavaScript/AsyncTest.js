"use strict";
//UTsGameInstance::OnStart里头，把QuickStart改为AsyncTest
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const AsyncUtils = require("./AsyncUtils");
const puerts_1 = require("puerts");
let world = puerts_1.argv.getByName("GameInstance").GetWorld();
async function asyncTest() {
    console.warn("begin to delay for 3 seconds...");
    let latentActionState = new UE.LatentActionState();
    UE.KismetSystemLibrary.Delay(world, 3, latentActionState.GetLatentActionInfo());
    await AsyncUtils.WaitLatentActionState(latentActionState);
    console.warn("delay finished");
    console.warn("async loading...");
    let cls = await AsyncUtils.AsyncLoad("/Game/StarterContent/TestBlueprint.TestBlueprint_C");
    console.warn("loaded class:" + cls.GetName());
}
asyncTest().catch((reason) => console.log("catch " + reason));
//# sourceMappingURL=AsyncTest.js.map