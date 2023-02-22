import type { App } from "vue";
import Module from "__XXENGINE__/Module";
import dayjs from 'dayjs';
declare global {
    interface IToolModule {
        formatStr(str: string, ...args: any[]): string
        /**
         * dayjs npm 
         * 年份 YY YYYY
         * 月 M(1-12) MM(01-12)
         * D DD 日期
         * H HH 24 小时制  h hh 12小时制
         * m mm 分钟
         * s ss 秒
         * S SS SSS 毫秒 S SS SSS 保留不同的位数
         * @param format 
         * @param times 默认是 now
         */
        formatTime(format: string, times?: number): string
    }
    interface ISysMoudles {
        tool: IToolModule;
    }
    interface XXECONFIG {

    }
}

export default class ToolModule extends Module implements IToolModule {
    name: string = "tool";

    formatStr(str: string, ...args: any[]) {
        let vStr = str;
        args.forEach((v, i) => {
            let reg = new RegExp(`\\{${i}\\}`, "g");
            console.log(reg)
            vStr = vStr.replace(reg, v);
        })
        return vStr;
    }

    /**
     * dayjs npm 
     * 年份 YY YYYY
     * 月 M(1-12) MM(01-12)
     * D DD 日期
     * H HH 24 小时制  h hh 12小时制
     * m mm 分钟
     * s ss 秒
     * S SS SSS 毫秒 S SS SSS 保留不同的位数
     * @param format 
     * @param times 默认是 now
     */
    formatTime(format: string, times?: number): string {
        return dayjs(times).format(format)
    }
}
