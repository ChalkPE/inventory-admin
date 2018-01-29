import Auth from './Auth.vue'
import Goods from './Goods.vue'
import Member from './Member.vue'
import General from './General.vue'

const meta = { requiresAuth: true }

const start = [
  { meta, path: '/general', component: General, name: '기본설정' },
  { meta, path: '/goods', component: Goods, name: '상품' },
  { meta, path: '/member', component: Member, name: '회원' }
]

const auth = { path: '/auth', component: Auth, name: '로그인' }

export default {
  start, auth, all: [...start, auth]
}
