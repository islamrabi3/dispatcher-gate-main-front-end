// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#F78E0F',
          secondary: '#132A53',
          background: '#EEF2F6'
        }
      },
      dark: {
        dark: true,
        colors: {}
      }
    }
  }
})

export default vuetify
