"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UMGTestMixin = void 0;
const puerts_1 = require("puerts");
//import * as AsyncUtils from 'Common/AsyncUtils'
let GameInstance = puerts_1.argv.getByName("GameInstance");
class UMGTestMixin {
    Construct() {
        console.warn("UMGTestMixin Construct called from TypeScript mixin");
    }
}
exports.UMGTestMixin = UMGTestMixin;
// blueprint.mixin(TS_UMGTestClass, UMGTestMixin, {objectTakeByNative : true});
//# sourceMappingURL=UMGTest_TS.js.map