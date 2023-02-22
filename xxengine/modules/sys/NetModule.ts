import Module from "__XXENGINE__/Module";
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
declare global {
    interface INetModule {
        createHttp(): Http;
    }
    interface ISysMoudles {
        net: INetModule;
      
    }

    type HttpConfigType = any;
}
export default class NetModule extends Module implements INetModule {
    name: string = "net";

    createHttp(): Http {
        return Http.create()
    }
}

const symAxios = Symbol();

class Http {
    private _axios: AxiosInstance;
    constructor() {
        this._axios = axios.create();
    }
    // 创建一个http实例
    static create() {
        return new Http();
    }

    async get<T>(url: string, cfg: HttpConfigType) {
        return await this._axios.get<T>(url, cfg)
    }

    async post<T>(url: string, data: any, cfg: HttpConfigType) {
        return await this._axios.post<T>(url, data, cfg)
    }
}
