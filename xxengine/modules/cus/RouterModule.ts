import type { App } from "vue";
import Module from "__XXENGINE__/Module";
import { createRouter, createWebHistory, type Router, type RouteRecordRaw, type RouterOptions } from 'vue-router'
declare global {
    interface IRouter {

    }
    interface IRouterModule {

    }
    interface ICusMoudles {
        router: IRouterModule;
    }
    interface XXECONFIG {
        router: {
            root: {
                path: string,
                componet: any,
            },
            layouts: {
                data: Record<string, any>
            }
        }
    }
}
export default class RouterModule extends Module implements IRouterModule, IRouter {
    name: string = "router";
    protected _router: Router = null;

    async onInit(app: App, cfg: Readonly<XXECONFIG>) {
        const routes: RouteRecordRaw[] = [
            { path: cfg.router.root.path, component: cfg.router.root.componet }
        ]
        this._router = createRouter({
            history: createWebHistory(),
            routes
        })
        app.use(this._router);
    }

}