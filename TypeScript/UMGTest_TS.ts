
import * as UE from 'ue'
import { $ref, $unref, argv, blueprint } from 'puerts'
//import * as AsyncUtils from 'Common/AsyncUtils'
let GameInstance = argv.getByName("GameInstance") as UE.GameInstance;


// const UMGTestClass = UE.Class.Load('/Game/UMGTest.UMGTest_C');
// const TS_UMGTestClass = blueprint.tojs<typeof UE.Game.UMGTest.UMGTest_C>(UMGTestClass);

export interface UMGTestMixin extends UE.Game.UMGTest.UMGTest_C {}

export class UMGTestMixin 
{
    Construct() : void{
        console.warn("UMGTestMixin Construct called from TypeScript mixin");
    }
}

// blueprint.mixin(TS_UMGTestClass, UMGTestMixin, {objectTakeByNative : true});
