import type { App } from "vue";

declare global {
    
    interface IModule {
        onInit?(app: App): Promise<any>;
    }
}

export default abstract class Module {
    readonly abstract name: string;
}
