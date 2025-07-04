/// <reference path="puerts.d.ts" />
declare module "ue" {
    import {$Ref, $Nullable} from "puerts"

    import * as cpp from "cpp"

    import * as UE from "ue"

// __TYPE_DECL_START: 33357AC6463C3AB157426D9264E94557
    namespace Game.StarterContent.MixinSuperTestBase {
        class MixinSuperTestBase_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_MixinSuperTestBase(EntryPoint: number) : void;
            Foo() : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MixinSuperTestBase_C;
            static Load(InName: string): MixinSuperTestBase_C;
        
            __tid_MixinSuperTestBase_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 2BDEF8114014B8B86032D4A518847312
    namespace Game.StarterContent.MixinSuperTestDerived {
        class MixinSuperTestDerived_C extends UE.Game.StarterContent.MixinSuperTestBase.MixinSuperTestBase_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            Foo() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MixinSuperTestDerived_C;
            static Load(InName: string): MixinSuperTestDerived_C;
        
            __tid_MixinSuperTestDerived_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 8C3BD456442ED5244F46E2A37BF5ECB7
    namespace Game.StarterContent.MixinTest {
        class MixinTest_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_MixinTest(EntryPoint: number) : void;
            Log(P: string) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MixinTest_C;
            static Load(InName: string): MixinTest_C;
        
            __tid_MixinTest_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: A5C7E431443721484614F0A5183DEBCD
    namespace Game.StarterContent.TestBlueprint {
        class TestBlueprint_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            B1: boolean;
            I1: number;
            I2: number;
            Bar(NewParam: UE.Game.StarterContent.TestStruct.TestStruct) : void;
            ExecuteUbergraph_TestBlueprint(EntryPoint: number) : void;
            Foo(P1: boolean, P2: number, P3: number) : void;
            /*
             *Event when play begins for this actor.
             */
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TestBlueprint_C;
            static Load(InName: string): TestBlueprint_C;
        
            __tid_TestBlueprint_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 59ADD20544E242E59B518787A6F8F288
    namespace Game.StarterContent.TestEnum {
        enum TestEnum { Blue, Red, Green, TestEnum_MAX, __typeKeyDoNoAccess}
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C9B8A43E442C8D87E5B77BB284D93163
    namespace Game.StarterContent.TestStruct {
        class TestStruct {
            constructor();
            constructor(speed: number, age: number);
            speed: number;
            age: number;
            /**
             * @deprecated use StaticStruct instead.
             */
            static StaticClass(): ScriptStruct;
            static StaticStruct(): ScriptStruct;
            __tid_TestStruct_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 2620B05B4D570B271A8AAF934441D4E7
    namespace Game.StarterContent.TestWidgetBlueprint {
        class TestWidgetBlueprint_C extends UE.UserWidget {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            Button1: UE.Button;
            TextBox: UE.MultiLineEditableTextBox;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TestWidgetBlueprint_C;
            static Load(InName: string): TestWidgetBlueprint_C;
        
            __tid_TestWidgetBlueprint_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: F3D240FC426D7E3DD961D9905E06E086
    namespace Game.UMG_Main {
        class UMG_Main_C extends UE.UserWidget {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            Button_27: UE.Button;
            BndEvt__UMG_Main_Button_27_K2Node_ComponentBoundEvent_0_OnButtonClickedEvent__DelegateSignature() : void;
            ExecuteUbergraph_UMG_Main(EntryPoint: number) : void;
            TestUI() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): UMG_Main_C;
            static Load(InName: string): UMG_Main_C;
        
            __tid_UMG_Main_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4B9398E4423A86CC247D188C94C69AC0
    namespace Game.UMGTest {
        class UMGTest_C extends UE.UserWidget {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            Image_20: UE.Image;
            /*
             *Called after the underlying slate widget is constructed.  Depending on how the slate object is used
             *this event may be called multiple times due to adding and removing from the hierarchy.
             *If you need a true called-once-when-created event, use OnInitialized.
             */
            Construct() : void;
            ExecuteUbergraph_UMGTest(EntryPoint: number) : void;
            /*
             *Called by both the game and the editor.  Allows users to run initial setup for their widgets to better preview
             *the setup in the designer and since generally that same setup code is required at runtime, it's called there
             *as well.
             *
             ***WARNING**
             *This is intended purely for cosmetic updates using locally owned data, you can not safely access any game related
             *state, if you call something that doesn't expect to be run at editor time, you may crash the editor.
             *
             *In the event you save the asset with blueprint code that causes a crash on evaluation.  You can turn off
             *PreConstruct evaluation in the Widget Designer settings in the Editor Preferences.
             */
            PreConstruct(IsDesignTime: boolean) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): UMGTest_C;
            static Load(InName: string): UMGTest_C;
        
            __tid_UMGTest_C_0__: boolean;
        }
        
    }

// __TYPE_DECL_END
}
