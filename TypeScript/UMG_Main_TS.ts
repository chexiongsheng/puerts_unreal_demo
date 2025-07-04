
import * as UE from 'ue'
import { $ref, $unref, argv, blueprint } from 'puerts'
import { UMGTestMixin } from './UMGTest_TS'
import {NewObject} from "ue";
//import * as AsyncUtils from 'Common/AsyncUtils'
let GameInstance = argv.getByName("GameInstance") as UE.GameInstance;


const MainClass = UE.Class.Load('/Game/UMG_Main.UMG_Main_C');
const TS_MainClass = blueprint.tojs<typeof UE.Game.UMG_Main.UMG_Main_C>(MainClass);

interface MainMixin extends UE.Game.UMG_Main.UMG_Main_C {}

class MainMixin 
{
    TestUI() : void{
        console.warn("TestUI called from TypeScript mixin");
        const UMGTestClass = UE.Class.Load('/Game/UMGTest.UMGTest_C');
        const TS_UMGTestClass = blueprint.tojs<typeof UE.Game.UMGTest.UMGTest_C>(UMGTestClass);
        blueprint.mixin(TS_UMGTestClass, UMGTestMixin, {objectTakeByNative : true});
        let tarWidget = NewObject(UMGTestClass, GameInstance.GetWorld()) as UE.UserWidget;
        tarWidget.AddToViewport(1);
    }
}

blueprint.mixin(TS_MainClass, MainMixin, {objectTakeByNative : true});
