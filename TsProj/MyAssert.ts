
class AssertionError extends Error {
    actual: any;
    expected: any;
    operator: string;
    code: string;
    constructor(message: string, actual?: any, expected?: any, operator?: string) {
        super(message);
        this.actual = actual;
        this.expected = expected;
        this.operator = operator;
        this.code = 'ERR_TGAMEJS_ASSERT';
        this.name = 'AssertionError';
    }
}

export function equal(actual: any, expected: any, message?: string): void {
    if (actual != expected) {
        throw new AssertionError(message || `${actual} == ${expected}`, actual, expected, '==');
    }
}

export function notEqual(actual: any, expected: any, message?: string): void {
    if (actual == expected) {
        throw new AssertionError(message || `${actual} != ${expected}`, actual, expected, '!=');
    }
}

export function ok(actual: any, message?: string): void {
    if (!!actual == false) {
        throw new AssertionError(message || `${actual} != true`, actual, true, '==');
    }
}