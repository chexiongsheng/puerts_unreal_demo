declare module "cpp" {
    import * as UE from "ue"
    import {$Ref, $Nullable} from "puerts"

    class AdvanceTestClass {
        constructor(p0: number);
        JsObjectTest(p0: object) :void;
        CallJsObjectTest(p0: object) :void;
        StdFunctionTest(p0: Function) :void;
    }

    class BaseClass {
        Foo(p0: number) :void;
    }

    class TestClass extends BaseClass {
        constructor(p0: number, p1: number);
        constructor();
        X: number;
        Y: number;
        static StaticInt: number;
        static readonly Ten: number;
        static Add(p0: number, p1: number) :number;
        static PrintInfo(p0: $Nullable<TestClass>) :void;
        static Overload() :void;
        static Overload(p0: number) :void;
        static Overload(p0: number, p1: number) :void;
        static Overload(p0: string, p1: number) :void;
        GetSelf() :TestClass;
        Ref(p0: $Ref<number>) :number;
        StrRef(p0: $Ref<string>) :void;
        Ptr(p0: $Ref<number>) :number;
        CStr(p0: $Nullable<string>) :string;
        StrPtr(p0: $Ref<string>) :void;
        ConstRef(p0: number) :void;
        OverloadMethod() :number;
        OverloadMethod(p0: number) :number;
        OverloadMethod(p0: bigint) :bigint;
    }

}
