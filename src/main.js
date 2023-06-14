import { createApp } from 'vue'
import App from './App.vue'

// Import FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

// Import Router
import router from './router'

// Import Pinia
import Pinia from './assets/js/auth'

// Import Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

// Add Library font awesome
library.add(fas)

// Membuat App
const app = createApp(App)

// Import Database Firebase
import { db } from './assets/js/firebase'

// Menambahkan instance database kedalam vue
app.config.globalProperties.$db = db

// Memanggil component vue dengan font awesome
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(router)
app.use(Pinia)
app.mount('#app')
