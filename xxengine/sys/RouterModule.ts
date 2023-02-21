
import { type App } from 'vue';
import Module from '../Module'

declare global {
    interface ISysMoudles {
        router: IRouterModule;
    }
    interface IRouterModule extends IModule {

    }
}

export default class RouterModule extends Module implements IRouterModule {

    readonly name: string = "route";
    onInit(app: App): Promise<any> {
        console.log("route init")
        return Promise.resolve();
    }
}