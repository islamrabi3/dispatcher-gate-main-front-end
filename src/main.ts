import 'vue3-toastify/dist/index.css'
import './assets/main.css'
import '@/plugins/vee-validate'
import '@/plugins/axiosConfig'

import { Vue3Toasity, toastOptions } from '@/plugins/vue3Toastify'
import vuetify from '@/plugins/vuetify'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueGoogleMaps from 'vue-google-maps-community-fork'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCm7NGdLk9j43WEO9izTPG4o4OD_9uVmyM',
    libraries: 'places'
  },
  autobindAllEvents: true
})
app.use(router)
app.use(vuetify)
app.use(Vue3Toasity, toastOptions)

app.mount('#app')
