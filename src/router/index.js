import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Elm from '../views/Elm.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import My from '../components/My.vue'
import Xq from '../components/Xq.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Elm',
    component: Elm
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/my',
    name: 'My',
    component: My
  },
  {
    path: '/xq',
    name: 'Xq',
    component: Xq
  },
  {
    path: '/:id',
    redirect:'/'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
