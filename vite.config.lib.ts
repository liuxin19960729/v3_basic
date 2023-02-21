import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import { lib } from './vite/ViteCfg'

// https://vitejs.dev/config/
export default defineConfig(lib)