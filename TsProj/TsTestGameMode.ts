import * as UE from 'ue'


class TsTestGameMode extends UE.GameModeBase {
    ReceiveBeginPlay(): void {
        console.warn("TsTestGameMode.ReceiveBeginPlay");
    }
}

export default TsTestGameMode;
