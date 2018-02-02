import Vue from 'vue'
import VueRouter from 'vue-router'
import menus from './menus'
import store from './store'

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
  const { loggedIn } = store.getters
  const { requiresAuth } = to.meta

  if (requiresAuth && !loggedIn) return next('/auth')
  if (to.name === '로그인' && loggedIn) return next(false)
  return next()
})

export default router
