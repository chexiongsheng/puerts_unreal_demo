"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TsTestGameMode extends UE.GameModeBase {
    ReceiveBeginPlay() {
        console.warn("TsTestGameMode.ReceiveBeginPlay");
    }
}
exports.default = TsTestGameMode;
//# sourceMappingURL=TsTestGameMode.js.map