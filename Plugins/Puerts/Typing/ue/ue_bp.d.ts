/// <reference path="puerts.d.ts" />
declare module "ue" {
    import {$Ref, $Nullable} from "puerts"

    import * as cpp from "cpp"

    import * as UE from "ue"

// __TYPE_DECL_START: B4B18A9840AE0492154B23AA4DFAF1BE
    namespace Game.ActorComp {
        class ActorComp_C extends UE.ActorComponent {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_ActorComp(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): ActorComp_C;
            static Load(InName: string): ActorComp_C;
        
            __tid_ActorComp_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 3D8887064975D986FFAD8D8C1691013C
    namespace Game.Blueprints.TypeScript.Animal {
        class Animal_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            Age: number;
            ExecuteUbergraph_Animal(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            Speak() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): Animal_C;
            static Load(InName: string): Animal_C;
        
            __tid_Animal_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 4AD53383471854D25ACC789E40F522F8
    namespace Game.Blueprints.TypeScript.MyTestActor {
        class MyTestActor_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            DefaultSceneRoot: UE.SceneComponent;
            Test() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MyTestActor_C;
            static Load(InName: string): MyTestActor_C;
        
            __tid_MyTestActor_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 751B49C34B94C9023C205093AC121A26
    namespace Game.Blueprints.TypeScript.MyTestActorComp {
        class MyTestActorComp_C extends UE.ActorComponent {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_MyTestActorComp(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            ReceiveTick(DeltaSeconds: number) : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MyTestActorComp_C;
            static Load(InName: string): MyTestActorComp_C;
        
            __tid_MyTestActorComp_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: C39767974302764576B74896F9B835CC
    namespace Game.Blueprints.TypeScript.MyTestActor_Child {
        class MyTestActor_Child_C extends UE.Game.Blueprints.TypeScript.MyTestActor.MyTestActor_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_MyTestActor_Child(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MyTestActor_Child_C;
            static Load(InName: string): MyTestActor_Child_C;
        
            __tid_MyTestActor_Child_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 1F73045B46CA362F53B18F84B0D741B9
    namespace Game.Blueprints.TypeScript.Tiger {
        class Tiger_C extends UE.Game.Blueprints.TypeScript.Animal.Animal_C {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            Speed: number;
            ExecuteUbergraph_Tiger(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): Tiger_C;
            static Load(InName: string): Tiger_C;
        
            __tid_Tiger_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: EB4B850C4D2A235E5BD7ECBC1B6C3E02
    namespace Game.Blueprints.TypeScript.TsTestActor {
        class TsTestActor_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            tickCount: number;
            actor: UE.Actor;
            cls: UE.Class;
            b: boolean;
            int64_1: bigint;
            int64_2: bigint;
            str: string;
            v: UE.Vector;
            map: TMap<string, number>;
            arr: TArray<UE.Object>;
            set: TSet<string>;
            fname: string;
            namearr: TArray<string>;
            dint: number;
            e: UE.ETickingGroup;
            ea: TArray<UE.ETickingGroup>;
            clsOfWidget: UE.Class;
            softObject: TSoftObjectPtr<UE.Actor>;
            softClass: TSoftClassPtr<UE.Actor>;
            Add(a1: number, b1: number) : number;
            ExecuteUbergraph_TsTestActor(EntryPoint: number) : void;
            Fire() : void;
            FireServer() : void;
            GetActor() : UE.Actor;
            GetArray() : TArray<UE.Object>;
            GetMap() : TMap<string, number>;
            OnRep_dint() : void;
            ReceiveBeginPlay() : void;
            ReceiveTick(DeltaSeconds: number) : void;
            SetActor(p1: $Nullable<UE.Actor>) : void;
            SetArray(p: $Ref<TArray<UE.Object>>) : void;
            TestCppType(p11: number, p21: number) : string;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsTestActor_C;
            static Load(InName: string): TsTestActor_C;
        
            __tid_TsTestActor_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 21BFF94D4E16890714578898AA1B1EC6
    namespace Game.Blueprints.TypeScript.TsTestGameInstance {
        class TsTestGameInstance_C extends UE.TypeScriptGameInstance {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            ExecuteUbergraph_TsTestGameInstance(EntryPoint: number) : void;
            ReceiveInit() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsTestGameInstance_C;
            static Load(InName: string): TsTestGameInstance_C;
        
            __tid_TsTestGameInstance_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 553A4B7045B8F391973937B32F7609AF
    namespace Game.Blueprints.TypeScript.TsTestGameMode {
        class TsTestGameMode_C extends UE.GameModeBase {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_TsTestGameMode(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TsTestGameMode_C;
            static Load(InName: string): TsTestGameMode_C;
        
            __tid_TsTestGameMode_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 069B9D4748DB9816259D0E8642A700B0
    namespace Game.Blueprints.TypeScript.Modules.AnotherActor {
        class AnotherActor_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_AnotherActor(EntryPoint: number) : void;
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): AnotherActor_C;
            static Load(InName: string): AnotherActor_C;
        
            __tid_AnotherActor_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
// __TYPE_DECL_START: 33357AC6463C3AB157426D9264E94557
    namespace Game.StarterContent.MixinSuperTestBase {
        class MixinSuperTestBase_C extends UE.Actor {
            constructor(Outer?: Object, Name?: string, ObjectFlags?: number);
            UberGraphFrame: UE.PointerToUberGraphFrame;
            DefaultSceneRoot: UE.SceneComponent;
            ExecuteUbergraph_MixinSuperTestBase(EntryPoint: number) : void;
            Foo() : void;
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MixinSuperTestBase_C;
            static Load(InName: string): MixinSuperTestBase_C;
        
            __tid_MixinSuperTestBase_C__: boolean;
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
        
            __tid_MixinSuperTestDerived_C__: boolean;
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
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): MixinTest_C;
            static Load(InName: string): MixinTest_C;
        
            __tid_MixinTest_C__: boolean;
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
            ReceiveBeginPlay() : void;
            static StaticClass(): Class;
            static Find(OrigInName: string, Outer?: Object): TestBlueprint_C;
            static Load(InName: string): TestBlueprint_C;
        
            __tid_TestBlueprint_C__: boolean;
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
            private __tid_TestStruct__: boolean;
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
        
            __tid_TestWidgetBlueprint_C__: boolean;
        }
        
    }

// __TYPE_DECL_END
}
