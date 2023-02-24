

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Index from './views/Index.vue'
import './plugins/taiwindcss/index.css'

import 'highlight.js/styles/atom-one-light.css'
import 'highlight.js/lib/common'
import hljs from 'highlight.js/lib/core'
import js from 'highlight.js/lib/languages/javascript'
import hljsPlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('javascript',js);

const layouts = import.meta.glob("@/views/layouts/*.vue", { eager: true })
const pages = import.meta.glob("@/views/pages/*/*.vue", { eager: true });
const cfg: XXECONFIG = {
    router: {
        root: {
            path: "/",
            componet: Index,
            layouts,
            pages
        },

    },
    comp: {
        import: import.meta.glob("@/components/**/*.vue")
    }
}

const app = createApp(App)
const pinia = createPinia()
xxe.init(app, cfg).then(v => {
    app.use(hljsPlugin);
    app.mount("#app");
}).catch(e => {
    xxe.sys.log.error(e)
})

/**
 * 用来捕获子组件的错误
 */
app.config.errorHandler = (err => {

})
