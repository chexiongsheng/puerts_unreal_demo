"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fib = Fib;
function fib(n) {
    if (n <= 1)
        return n;
    else
        return fib(n - 1) + fib(n - 2);
}
function Fib(n) {
    let beginTime = new Date();
    let result = fib(n);
    let endTime = new Date();
    return ("using " + (endTime.getTime() - beginTime.getTime()) + "ms, result = " + result); //+ result防止被优化
}
//# sourceMappingURL=JitTest.js.map