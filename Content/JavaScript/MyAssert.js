"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equal = equal;
exports.notEqual = notEqual;
exports.ok = ok;
class AssertionError extends Error {
    actual;
    expected;
    operator;
    code;
    constructor(message, actual, expected, operator) {
        super(message);
        this.actual = actual;
        this.expected = expected;
        this.operator = operator;
        this.code = 'ERR_TGAMEJS_ASSERT';
        this.name = 'AssertionError';
    }
}
function equal(actual, expected, message) {
    if (actual != expected) {
        throw new AssertionError(message || `${actual} == ${expected}`, actual, expected, '==');
    }
}
function notEqual(actual, expected, message) {
    if (actual == expected) {
        throw new AssertionError(message || `${actual} != ${expected}`, actual, expected, '!=');
    }
}
function ok(actual, message) {
    if (!!actual == false) {
        throw new AssertionError(message || `${actual} != true`, actual, true, '==');
    }
}
//# sourceMappingURL=MyAssert.js.map