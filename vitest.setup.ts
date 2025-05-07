import { config , RouterLinkStub } from '@vue/test-utils'
import vuetify from './src/plugins/vuetify'
import router from './src/router'
import { setActivePinia, createPinia } from 'pinia'
global.ResizeObserver = require('resize-observer-polyfill')






config.global.plugins = [vuetify,setActivePinia(createPinia()),router]