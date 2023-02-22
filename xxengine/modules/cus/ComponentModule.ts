import type { App, Component } from "vue";
import Module from "__XXENGINE__/Module";
import _ from 'lodash'
declare global {
    interface IRouter {

    }
    interface IComponentModule {

    }
    interface ICusMoudles {
        comp: IComponentModule;
    }
    interface XXECONFIG {
        /**
         * 自动注册组件配置
         */
        comp: {
            import: Record<string, any>,
            comps?: { name: string, comp: Component }[]
        }
    }
}
export default class ComponentModule extends Module implements IComponentModule {
    name: string = "comp";
    onInit?(app: App, cfg: Readonly<XXECONFIG>): Promise<any> {

        Object.entries(cfg.comp.import).forEach(([k, v]) => {
            let fname = k.match(/(\w+).vue/)[1];
            fname = _.camelCase(fname);
            xxe.sys.log.debug(fname + " 自动注册");
            app.component(fname,v.default)
        })

        cfg.comp.comps && cfg.comp.comps.forEach(v => {
            app.component(v.name, v.comp);
            xxe.sys.log.debug(v.name + " 自动注册");
        })

        
        return Promise.resolve();
    }
}