import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Import nProgress CSS
import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
