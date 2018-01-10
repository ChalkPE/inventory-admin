import Vue from 'vue'
import VueRouter from 'vue-router'
import menus from './menus'

Vue.use(VueRouter)

const routes = [
  ...menus.all,
  { path: '*', redirect: { name: '기본설정' } }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'is-active'
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const { $store } = this.a.app
  if ($store.getters.loggedIn) return next()

  next('/auth')
})

export default router
