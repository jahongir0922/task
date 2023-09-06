import './assets/scss/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueHtmlToPaper from './plugins/VueHtmlToPaper'
import './api/api.js'
import CKEditor from '@ckeditor/ckeditor5-vue'
const app = createApp(App)
app.use(CKEditor)
app.use(VueHtmlToPaper)
app.use(createPinia())
app.use(router)
app.mount('#app')
