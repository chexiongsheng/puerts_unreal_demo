"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
const puerts_1 = require("puerts");
const UMGTest_TS_1 = require("./UMGTest_TS");
const ue_1 = require("ue");
//import * as AsyncUtils from 'Common/AsyncUtils'
let GameInstance = puerts_1.argv.getByName("GameInstance");
const MainClass = UE.Class.Load('/Game/UMG_Main.UMG_Main_C');
const TS_MainClass = puerts_1.blueprint.tojs(MainClass);
class MainMixin {
    TestUI() {
        console.warn("TestUI called from TypeScript mixin");
        const UMGTestClass = UE.Class.Load('/Game/UMGTest.UMGTest_C');
        const TS_UMGTestClass = puerts_1.blueprint.tojs(UMGTestClass);
        puerts_1.blueprint.mixin(TS_UMGTestClass, UMGTest_TS_1.UMGTestMixin, { objectTakeByNative: true });
        let tarWidget = (0, ue_1.NewObject)(UMGTestClass, GameInstance.GetWorld());
        tarWidget.AddToViewport(1);
    }
}
puerts_1.blueprint.mixin(TS_MainClass, MainMixin, { objectTakeByNative: true });
//# sourceMappingURL=UMG_Main_TS.js.map