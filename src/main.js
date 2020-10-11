import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
//src/main.js
import BootstrapVue from 'bootstrap-vue'
//src/main.js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from './store'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  router,
  Axios,
  // components: { App },
  // template: '<App/>'
}).$mount('#app')

