import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueMathjax from 'vue-mathjax'
import '@mdi/font/css/materialdesignicons.css'
import i18n from './i18n'

import browserDetect from "vue-browser-detect-plugin";

import VueClipboard from 'vue-clipboard2'


import VueWebSpeech from 'vue-web-speech'

import VueCookies from 'vue-cookies'
// Tell Vue to use the plugin

Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(VueMathjax)
Vue.use(VueCookies)
Vue.use(VueWebSpeech)
Vue.use(browserDetect);
Vue.use(VueClipboard)


new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
