import Auth from './Auth.vue'
import General from './General.vue'
import Goods from './Goods.vue'
import Order from './Order.vue'
import Member from './Member.vue'
import Board from './Board.vue'

const meta = { requiresAuth: true }

const start = [
  { meta, path: '/general', component: General, name: '기본설정' },
  { meta, path: '/goods', component: Goods, name: '상품' },
  { meta, path: '/order', component: Order, name: '주문' },
  { meta, path: '/member', component: Member, name: '회원' },
  { meta, path: '/board', component: Board, name: '게시판' }
]

const auth = { path: '/auth', component: Auth, name: '로그인' }

export default {
  start, auth, all: [...start, auth]
}
