declare module "puerts" {
    import {Object, $Ref, Class} from "ue"
    
    function $ref<T>(x : T) : $Ref<T>;
    
    function $unref<T>(x: $Ref<T>) : T;
    
    function $set<T>(x: $Ref<T>, val:T) : void;
    
    const argv : {
        getByIndex(index: number): Object;
        getByName(name: string): Object;
    }
    
    function merge(des: {}, src: {}): void;
    
    function requestJitModuleMethod(moduleName: string, methodName: string, callback: (err: Error, result: any)=> void, ... args: any[]): void;
    
    function makeUClass(ctor: { new(): Object }): Class;
    
    function blueprint<T extends {
        new (...args:any[]): Object;
    }>(path:string): T;

    /*function getProperties(obj: Object, ...propNames:string[]): any;
    function getPropertiesAsync(obj: Object, ...propNames:string[]): Promise<any>;
    function setProperties(obj: Object, properties: any):void;
    function setPropertiesAsync(obj: Object, properties: any):Promise<void>;
    function flushAsyncCall(trace?:boolean):number;

    type AsyncFunction<T extends (...args: any) => any>  = (...a: ArgumentTypes<T>) => Promise<ReturnType<T> extends Object ? AsyncObject<ReturnType<T>> : ReturnType<T>>;

    type AsyncObject<T> = {
        [P in keyof T] : T[P] extends (...args: any) => any ? AsyncFunction<T[P]> : T[P];
    } & T

    function $async<T>(x: T) : AsyncObject<T>;*/
}

declare function require(name: string): any;