"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tgamejs");
;
;
let mochaStr = tgamejs.loadModule("mocha", "../JavaScript/mocha.js");
mochaStr = mochaStr.substring(mochaStr.indexOf('\n') + 1).substring(mochaStr.indexOf('\n') + 1);
let executeScript = mochaStr
    + " mocha.setup({ "
    + "   ui: 'bdd', "
    + "   reporter: 'json' "
    + " }); "
    + " mocha.addFile('./AutoGenTest.js'); "
    + " mocha.run().on('end', function() { "
    + "     let allTestsNum = this.testResults.stats.tests; "
    + "     let passesNum = this.testResults.stats.passes; "
    + "     let failuresNum = this.testResults.stats.failures; "
    + "     if (failuresNum > 0) {"
    + "         console.log(JSON.stringify(this.testResults.failures, null, 4));"
    + "     }"
    + "     console.warn(`Test Summary: Pass[${passesNum}/${allTestsNum}], Fail[${failuresNum}/${allTestsNum}].`); "
    + " }); ";
class BOMString {
    replace(regex, replacer) {
        return this;
    }
}
global.location = new BOMString;
function wrapCode(src) {
    src = '{' + src + '}';
    const code = new Function('console', 'global', 'require', src);
    return code;
}
wrapCode(executeScript)(tgamejs.console, global, globalThis.require);
//# sourceMappingURL=RunAutoGenTest.js.map