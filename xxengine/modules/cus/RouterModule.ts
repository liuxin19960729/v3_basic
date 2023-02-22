import type { App } from "vue";
import Module from "__XXENGINE__/Module";
import { createRouter, createWebHistory, loadRouteLocation, type Router, type RouteRecordRaw, type RouterOptions } from 'vue-router'
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
                layouts: Record<string, any>;
            },
        }
    }
}
export default class RouterModule extends Module implements IRouterModule, IRouter {
    name: string = "router";
    protected _router: Router = null;
    protected autoload(prefex: string, parent: RouteRecordRaw, mods: any) {
        let route: RouteRecordRaw[] = [];
        Object.entries(mods).forEach(([k, v]) => {
            let fname = k.match(/(\w+).vue/)[1];
            route.push({
                path: `${prefex}/${fname}`,
                component: (<any>v).default
            });
        })
        console.log(route)
        parent.children = route;
    }
    async onInit(app: App, cfg: Readonly<XXECONFIG>) {
        const routes: RouteRecordRaw[] = []
        const root = { path: cfg.router.root.path, component: cfg.router.root.componet }
        this.autoload("", root, cfg.router.root.layouts);
        routes.push(root);
        this._router = createRouter({
            history: createWebHistory(),
            routes
        })
        app.use(this._router);
    }

}