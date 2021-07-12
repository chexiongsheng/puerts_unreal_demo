declare module "cpp" {
    class TestClass extends BaseClass {
        constructor(p0: number, p1: number);
        constructor();
        X: number;
        Y: number;
        static CheckedAdd(p0: number, p1: number) :number;
        static Add(p0: number, p1: number) :number;
        static PrintInfo(p0: TestClass) :void;
        static Overload() :void;
        static Overload(p0: number) :void;
        static Overload(p0: number, p1: number) :void;
        static Overload(p0: string, p1: number) :void;
        CheckedId(p0: number) :number;
        GetSelf() :TestClass;
        Id(p0: number) :number;
        OverloadMethod() :number;
        OverloadMethod(p0: number) :number;
        OverloadMethod(p0: bigint) :bigint;
    }

    class BaseClass {
        Foo(p0: number) :void;
    }

}
