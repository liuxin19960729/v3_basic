import type { App } from "vue";




export default abstract class Module {
    abstract name: string;
    beforeInit?(app: App, cfg: Readonly<XXECONFIG>): void;
    onInit?(app: App, cfg: Readonly<XXECONFIG>): Promise<any>;
    afterInit?(app: App, cfg: Readonly<XXECONFIG>): void
}
