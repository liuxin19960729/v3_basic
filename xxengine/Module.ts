import type { App } from "vue";




export default abstract class Module {
    abstract name: string;
    onInit?(app: App,cfg:Readonly<XXECONFIG>): Promise<any>;
}
