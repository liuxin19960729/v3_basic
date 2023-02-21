

import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)

xxe.init(app).then(v => app.mount("#app")).catch(e => {
    console.log("e");
})
