import { createApp } from 'vue'
import App from './App.vue'

// Import Router
import router from './router/Route'

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App)

// Import Database Firebase
import { db } from './assets/js/firebase'

// Menambahkan instance database kedalam vue
app.config.globalProperties.$db = db

app.use(router)
app.mount('#app')
