//UTsGameInstance::OnStart里头，把QuickStart改为AsyncTest

import * as UE from 'ue'
import * as AsyncUtils from './AsyncUtils'
import {argv} from 'puerts';

let world = (argv.getByName("GameInstance") as UE.GameInstance).GetWorld();

async function asyncTest() {
    console.warn("begin to delay for 3 seconds...");
    let latentActionState = new UE.LatentActionState();
    UE.KismetSystemLibrary.Delay(world, 3, latentActionState.GetLatentActionInfo());
    await AsyncUtils.WaitLatentActionState(latentActionState);
    console.warn("delay finished");

    console.warn("async loading...");
    let cls = await AsyncUtils.AsyncLoad("/Game/StarterContent/TestBlueprint.TestBlueprint_C");
    console.warn("loaded class:" + cls.GetName());
}

asyncTest().catch((reason) => console.log("catch " + reason));

