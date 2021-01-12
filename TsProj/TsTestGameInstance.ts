import * as UE from 'ue'


class TsTestGameInstance extends UE.GameInstance {
    ReceiveInit(): void {
        console.warn('TsTestGameInstance.ReceiveInit');
    }

    ReceiveShutdown(): void {
        console.warn('TsTestGameInstance.ReceiveShutdown');
    }
}

export default TsTestGameInstance;
