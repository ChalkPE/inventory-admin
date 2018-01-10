import Vue from 'vue'
import VueRouter from 'vue-router'
import menus from './menus'

Vue.use(VueRouter)

const routes = [
  ...menus,
  { path: '*', redirect: { name: '기본설정' } }
]

export default new VueRouter({
  routes,
  linkActiveClass: 'is-active'
})
