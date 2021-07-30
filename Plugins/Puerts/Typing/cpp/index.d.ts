declare module "cpp" {
    import {$Ref, $Nullable} from "puerts"

    class BaseClass {
        Foo(p0: number) :void;
    }

    class TestClass extends BaseClass {
        constructor(p0: number, p1: number);
        constructor();
        X: number;
        Y: number;
        static Add(p0: number, p1: number) :number;
        static PrintInfo(p0: $Nullable<TestClass>) :void;
        static Overload() :void;
        static Overload(p0: number) :void;
        static Overload(p0: number, p1: number) :void;
        static Overload(p0: string, p1: number) :void;
        GetSelf() :TestClass;
        Ref(p0: $Ref<number>) :number;
        ConstRef(p0: number) :void;
        OverloadMethod() :number;
        OverloadMethod(p0: number) :number;
        OverloadMethod(p0: bigint) :bigint;
    }

    class AdvanceTestClass {
        constructor(p0: number);
        JsObjectTest(p0: object) :void;
        CallJsObjectTest(p0: object) :void;
        StdFunctionTest(p0: Function) :void;
    }

}
