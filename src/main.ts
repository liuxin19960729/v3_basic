

import { createApp } from 'vue'
import App from './App.vue'
import Index from './views/Index.vue'

const layouts = import.meta.glob("@/views/layouts/*.vue", { eager: true })
const pages=import.meta.glob("@/views/pages/*/*.vue", { eager: true });
const cfg: XXECONFIG = {
    router: {
        root: {
            path: "/",
            componet: Index,
            layouts,
            pages
        },

    }
}

const app = createApp(App)

xxe.init(app, cfg).then(v => {
    xxe.sys.log.error("c")
    app.mount("#app");
 
}).catch(e => {
    xxe.sys.log.error(e)
})

xxe.sys.log.debug("zz")