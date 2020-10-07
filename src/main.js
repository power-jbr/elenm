import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import './plugins/element.js'
import http from './utils/request'
import axios from 'axios'
import {gets,posts} from './utils/api'

axios.defaults.withCredentials=true;//让ajax携带cookie

Vue.prototype.$Axios=axios

Vue.prototype.$http=http
Vue.prototype.$get=gets
Vue.prototype.$post=posts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
