import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './plugins/element.js'
import axios from 'axios'
import http from './http'

Vue.prototype.$Axios=axios

Vue.prototype.$http=http

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
