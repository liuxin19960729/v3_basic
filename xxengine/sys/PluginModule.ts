import type { App } from "vue";
import Module from "../Module"

declare global {
    interface ISysMoudles {
        plugin: IPluginMoule;
    }
    interface IPluginMoule extends IModule {

    }
}
export default class PluginMoule extends Module implements IPluginMoule {
    name: string = "plugin";
    onInit(app: App): Promise<any> {
        console.log("plugin init");
        let comps = import.meta.glob(["./plugins/**/*.ts", "!./plugins/IPlugin.ts"], { eager: true });

        return Promise.all(Object.entries(comps).filter(([k, v]) => {
            let plu = new (<any>v).default()
            return !!plu.setup && !!plu.setup(app);
        })
        );
    }
}