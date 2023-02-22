import type { App } from "vue";
import Module from "./Module";



declare global {
    interface ISysMoudles {

    }
    interface ICusMoudles {

    }
    interface XXECONFIG {

    }
    namespace xxe {
        const sys: ISysMoudles;
        const cus: ICusMoudles;
        function init(app: App, cfg: XXECONFIG): Promise<any>;
    }
}

export type ModType = "sys" | "cus";



class Modules {
    private readonly sys: { [key: keyof any]: Module } = {};
    private readonly cus: { [key: keyof any]: Module } = {}
    async init(app: App, cfg: Readonly<XXECONFIG>) {
        let comps = import.meta.glob(["__XXENGINE__/modules/**/*.ts"], { eager: true });

        Object.entries(comps).forEach(([k, v]) => {
            let mod: Module = new (<any>v).default();
            const type: ModType = /modules\/sys/.test(k) ? "sys" : "cus";
            this.register(mod.name, mod, type)
        });

        Object.values(this.sys).forEach(v => (<Module>v).beforeInit && (<Module>v).beforeInit(app, cfg));
        Object.values(this.cus).forEach(v => (<Module>v).beforeInit && (<Module>v).beforeInit(app, cfg));

        let syss = Object.entries(this.sys).map(([k, v]) => {
            return (<any>v).onInit && (<any>v).onInit(app, cfg);
        })
        let cuss = Object.entries(this.cus).map(([k, v]) => {
            return (<Module>v).onInit && (<Module>v).onInit(app, cfg);
        })
        await Promise.all([syss, cuss]);

        Object.values(this.sys).forEach(v => (<Module>v).afterInit && (<Module>v).afterInit(app, cfg));
        Object.values(this.cus).forEach(v => (<Module>v).afterInit && (<Module>v).afterInit(app, cfg));
        
        return Promise.resolve();
    }
    register(name: string, mod: Module, type: ModType) {
        let continer = type == "cus" ? this.cus : this.sys;
        if (!!!name || !!!mod || !!!type) {
            throw new Error("mod constructor 错误");
        }
        if (continer[name]) {
            throw new Error(`重复注册名字${name} 模块`);
        }
        if (!(mod instanceof Module)) {
            throw new Error(`${name} 模块未继承 Module`);
        }
        continer[name] = mod;
    }
}


const mods = new Modules();

(<any>window)["xxe"] = mods;
export default mods;


