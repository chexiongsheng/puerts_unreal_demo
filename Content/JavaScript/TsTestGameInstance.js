"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
class TsTestGameInstance extends UE.GameInstance {
    ReceiveInit() {
        console.warn('TsTestGameInstance.ReceiveInit');
    }
    ReceiveShutdown() {
        console.warn('TsTestGameInstance.ReceiveShutdown');
    }
}
exports.default = TsTestGameInstance;
//# sourceMappingURL=TsTestGameInstance.js.map