import type { BuildOptions, ConfigEnv, UserConfig } from "vite"
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

const basic = (env?: ConfigEnv): UserConfig => {
    return {
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL(`${process.cwd()}/src`, import.meta.url)),
                '__XXENGINE__': fileURLToPath(new URL(`${process.cwd()}/xxengine`, import.meta.url))
            },
        }
    }
}

const lib = (env: ConfigEnv): UserConfig => {
    let cfg = basic();
   // dst 关闭
    // cfg.plugins?.push(dts());
    cfg.build = {};
    cfg.build.lib = {
        entry: `${process.cwd()}/xxengine/xxengine.ts`,
        name: 'xxe',
        fileName: "xxengine",
        // iife 是立即执行函数
        formats: ["umd"]
    }
    cfg.build.rollupOptions = {
        external: ["vue"]
    }
    // 设定输出路径
    cfg.build.outDir=`${process.cwd()}/libdst`
    return cfg;
}

export { basic, lib }