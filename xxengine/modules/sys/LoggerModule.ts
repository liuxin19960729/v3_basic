import type { App } from "vue";
import Module from "__XXENGINE__/Module";

declare global {
    interface ILoggerModule {
        info(str: string, ...args: any[]): void;
        debug(str: string, ...args: any[]): void;
        error(str: string, ...args: any[]): void;
    }
    interface ISysMoudles {
        log: ILoggerModule;
    }
    interface XXECONFIG {
        log?: {
            level: xxe.LogLevel;
        }
    }
    namespace xxe {
        enum LogLevel {
            INFO = 1 << 0,
            DEBUG = 1 << 1,
            ERROR = 1 << 2,
            ALL = INFO + DEBUG + ERROR
        }

    }
}

export enum LogLevel {
    INFO = 1 << 0,
    DEBUG = 1 << 1,
    ERROR = 1 << 2,
    ALL = INFO + DEBUG + ERROR
}



export default class LoggerModule extends Module implements ILoggerModule {
    name: string = "log";
    level: LogLevel = LogLevel.ALL;
    info(str: string, ...args: any[]) {
        if ((this.level & LogLevel.INFO) != LogLevel.INFO) return;
        let fstr = this._msgStr(xxe.sys.tool.formatStr(str, ...args))
        console.log(fstr);
    }

    debug(str: string, ...args: any[]) {
        if ((this.level & LogLevel.DEBUG) != LogLevel.DEBUG) return;
        let fstr = this._msgStr(xxe.sys.tool.formatStr(str, ...args))
        console.log(`%c${fstr}`, "color:green;")

    }

    error(str: string, ...args: any[]) {
        if ((this.level & LogLevel.ERROR) != LogLevel.ERROR) return;
        let fstr = this._msgStr(xxe.sys.tool.formatStr(str, ...args))
        console.log(`%c${fstr}`, "color:red;")
    }

    private _msgStr(rawStr: string): string {
        const timtStr = xxe.sys.tool.formatTime("YYYY-MM-DD HH:mm:SSS");
        try {
            throw new Error()
        } catch (e) {
            const stack = (e as Error).stack;
            let line = stack.split('\n')[3];
            const methodStr = line.match(/(\S)+/gi)[1] || "";
            let str = ""
            if (/^https?:\/\//.test(methodStr)) {
                str = `[${timtStr}] ${rawStr} at:${methodStr}`
            } else {
                str = `[${timtStr}] ${methodStr} ${rawStr}`
            }
            return str;
        }
    }


}