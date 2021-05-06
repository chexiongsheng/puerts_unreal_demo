import * as UE from 'ue'
import {ReactUMG, Root} from 'react-umg';
import * as UI from './main-ui';
import {on} from 'puerts';

class TsTestGameInstance extends UE.TypeScriptGameInstance {
    //@no-blueprint
    root: Root;

    ReceiveInit(): void {
        console.warn('TsTestGameInstance.ReceiveInit');
        
        this.StartNotify.Bind(() => this.OnStart());
    }

    //@no-blueprint
    OnStart():void {
        console.warn('TsTestGameInstance.OnStart');
        ReactUMG.init(this.GetWorld());
        this.root = UI.Load();

        on('HMR.finish', (moduleName: string, module: any) => this.OnReload(moduleName, module));
    }

    //@no-blueprint
    OnReload(moduleName: string, module: any): void {
        console.warn('HMR.finish', moduleName);
        if (moduleName == "main-ui/index") {
            if (this.root) this.root.removeFromViewport();
            this.root = UI.Load();
        }
    }
}

export default TsTestGameInstance;
