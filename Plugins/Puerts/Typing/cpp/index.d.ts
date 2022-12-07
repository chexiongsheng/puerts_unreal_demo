declare module "cpp" {
    import * as UE from "ue"
    import * as cpp from "cpp"
    import {$Ref, $Nullable, cstring} from "puerts"

    class AdvanceTestClass {
        constructor(p0: number);
        JsObjectTest(p0: object) :void;
        CallJsObjectTest(p0: object) :void;
        StdFunctionTest(p0: (p0:number, p1:number) => number) :void;
    }

    class BaseClass {
        Foo(p0: number) :void;
    }

    class FPuertsEditorModule {
        static SetCmdCallback(p0: (p0:string, p1:string) => void) :void;
    }

    class NoDeleteClass {
        constructor();
    }

    class TestClass extends BaseClass {
        constructor(p0: number, p1: number);
        constructor();
        X: number;
        Y: number;
        static StaticInt: number;
        static readonly Ten: number;
        static Add(p0: number, p1: number) :number;
        static PrintInfo(p0: TestClass) :void;
        static Overload() :void;
        static Overload(p0: number) :void;
        static Overload(p0: number, p1: number) :void;
        static Overload(p0: string, p1: number) :void;
        GetSelf() :TestClass;
        NoEmptyRef(p0: $Ref<NoDeleteClass>) :void;
        Ref(p0: $Ref<number>) :number;
        StrRef(p0: $Ref<string>) :void;
        Ptr(p0: $Ref<number>) :number;
        CStr(p0: cstring) :cstring;
        StrPtr(p0: $Ref<string>) :void;
        ConstRef(p0: number) :void;
        OverloadMethod() :number;
        OverloadMethod(p0: number) :number;
        OverloadMethod(p0: bigint) :bigint;
    }

}
