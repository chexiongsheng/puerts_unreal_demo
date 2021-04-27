"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UE = require("ue");
function WaitLatentActionState(state) {
    return new Promise((resolve, reject) => {
        state.LatentActionCallback.Bind(() => {
            state.LatentActionCallback.Unbind();
            resolve();
        });
    });
}
exports.WaitLatentActionState = WaitLatentActionState;
function AsyncLoad(path) {
    return new Promise((resolve, reject) => {
        let asyncLoadObj = new UE.AsyncLoadState();
        asyncLoadObj.LoadedCallback.Bind((cls) => {
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
exports.AsyncLoad = AsyncLoad;
//# sourceMappingURL=AsyncUtils.js.map