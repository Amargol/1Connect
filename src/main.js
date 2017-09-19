// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import * as firebase from 'firebase'
import App from './App'
import router from './router'
import { store } from './store'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCLd5sFs0h0yZ90Ff7umVSH0tkftwNMf_I',
      authDomain: 'connect-2e590.firebaseapp.com',
      databaseURL: 'https://connect-2e590.firebaseio.com',
      projectId: 'connect-2e590',
      storageBucket: 'connect-2e590.appspot.com'
    })
  },
  components: { App }
})
