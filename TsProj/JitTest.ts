function fib(n: number) {
    if (n <= 1)
        return n;
    else
        return fib(n-1) + fib(n-2);
}

export function Fib(n: number): string {
    let beginTime = new Date()
    let result = fib(n);
    let endTime = new Date();
    return ("using " + (endTime.getTime() - beginTime.getTime()) + "ms, result = " + result); //+ result防止被优化
}
