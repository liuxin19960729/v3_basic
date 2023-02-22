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
                layouts: Record<string, any>,
                pages: Record<string, any>,
            },
        }
    }
}
export default class RouterModule extends Module implements IRouterModule, IRouter {
    name: string = "router";
    protected _router: Router = null;
    protected autoload(prefex: string, parent: RouteRecordRaw, mods: any, isPage: boolean = false) {
        let route: RouteRecordRaw[] = [];
        prefex = /\/$/.test(prefex) ? prefex : prefex + "/";
        const reg = !isPage ? /(\w+).vue$/ : new RegExp(`${prefex}(\\w+).vue$`);
        Object.entries(mods).forEach(([k, v]) => {
            const match = k.match(reg)
            if (!!match) {
                const fname = match[1]
                route.push({
                    path: `${prefex}${fname}`,
                    component: (<any>v).default,
                    name: `${prefex == "/" ? "" : prefex}${fname}`.replace(/\//, "_")
                });
            }
        })
        parent.children = route;
    }
    async onInit(app: App, cfg: Readonly<XXECONFIG>) {
        const routes: RouteRecordRaw[] = []
        const root: RouteRecordRaw =
            { path: cfg.router.root.path, component: cfg.router.root.componet }
        //挂载root 下的layout
        this.autoload("/", root, cfg.router.root.layouts);
        //挂载 layout 下的pages
        (<RouteRecordRaw[]>(root.children || [])).forEach(layout => this.autoload(layout.path,
            layout, cfg.router.root.pages, true));
        routes.push(root);
        this._router = createRouter({
            history: createWebHistory(),
            routes
        })
        app.use(this._router);
    }

}