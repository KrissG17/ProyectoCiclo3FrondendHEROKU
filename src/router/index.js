import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notas',
    name: 'Notas',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notas.vue')
  },
  {
    path: '/libros',
    name: 'Libros',
    component: () => import(/* webpackChunkName: "about" */ '../views/Libros.vue')
  }
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
