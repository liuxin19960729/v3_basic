import type { App } from "vue";
import Module from "./Module";



declare global {
    interface ISysMoudles {

    }
    interface ICusMoudles {

    }
    namespace xxe {
        const sys: ISysMoudles;
        const cus: ICusMoudles;
        function init(app: App): Promise<any>;
    }
}

const getModule = (path: string, rawMod: any): { name: string, mod: any, type: "sys" | "cus" } => {
    let type: "sys" | "cus" = path.includes("sys") ? "sys" : "cus";
    let modObj = new rawMod.default();
    return { name: modObj.name, mod: modObj, type: type };
}

class Modules {
    private readonly sys: { [key: keyof any]: Module } = {};
    private readonly cus: { [key: keyof any]: Module } = {}
    async init(app: App) {
        // 过滤到 sys/plugins 里面的内容
        let comps = import.meta.glob(["__XXENGINE__/sys/**/*.ts",
            "__XXENGINE__/cus/**/*.ts", "!__XXENGINE__/sys/plugins/**/*.ts"], { eager: true });
        const cb = (comps: Record<string, unknown>) => {
            Object.entries(comps).forEach(([k, v]) => {
            
                const data = getModule(k, v);
                this.register(data.name, data.mod, data.type);
            })
        }
        cb(comps)
        let syss = Object.entries(this.sys).map(([k, v]) => {
            return (<any>v).onInit && (<any>v).onInit(app);
        })
        let cuss = Object.entries(this.cus).map(([k, v]) => {
            return (<any>v).onInit && (<any>v).onInit(app);
        })

        return Promise.all([syss, cuss]);
    }
    protected register(name: string, mod: Module, type: "sys" | "cus") {
        let continer = type == "cus" ? this.cus : this.sys;
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


