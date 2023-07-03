import * as UE from 'ue'

export function WaitLatentActionState(state: UE.LatentActionState) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
        state.LatentActionCallback.Bind(() => {
            state.LatentActionCallback.Unbind();
            resolve();
        });
    });

}

export function AsyncLoad(path:string): Promise<UE.Class> {
    return new Promise<UE.Class>((resolve, reject) => {
        let asyncLoadObj = new UE.AsyncLoadState();
        asyncLoadObj.LoadedCallback.Bind((cls:UE.Class) => {
            asyncLoadObj.LoadedCallback.Unbind();
            if (cls) {
                resolve(cls);
            }
            else {
                reject(`load ${path} fail`);
            }
        });
        asyncLoadObj.StartLoad(path);
    });
}