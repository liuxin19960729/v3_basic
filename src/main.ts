

import { createApp } from 'vue'
import App from './App.vue'
import Index from './views/Index.vue'

const layouts = import.meta.glob("@/views/layouts/*.vue",{eager:true})
const cfg: XXECONFIG = {
    router: {
        root: {
            path: "/",
            componet: Index,
            layouts
        },

    }
}

const app = createApp(App)

xxe.init(app, cfg).then(v => {
    app.mount("#app");
}).catch(e => {
    console.error(e);
})
