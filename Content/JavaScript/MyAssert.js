"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssertionError extends Error {
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
exports.equal = equal;
function notEqual(actual, expected, message) {
    if (actual == expected) {
        throw new AssertionError(message || `${actual} != ${expected}`, actual, expected, '!=');
    }
}
exports.notEqual = notEqual;
function ok(actual, message) {
    if (!!actual == false) {
        throw new AssertionError(message || `${actual} != true`, actual, true, '==');
    }
}
exports.ok = ok;
//# sourceMappingURL=MyAssert.js.map