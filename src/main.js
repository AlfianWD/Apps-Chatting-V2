import './assets/css/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/Route'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App)

app.use(router)
app.mount('#app')
