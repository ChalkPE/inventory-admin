import General from './General.vue'
import Goods from './Goods.vue'
import Order from './Order.vue'
import Member from './Member.vue'
import Board from './Board.vue'

export default [
  { name: '기본설정', path: '/general', component: General },
  { name: '상품', path: '/goods', component: Goods },
  { name: '주문', path: '/order', component: Order },
  { name: '회원', path: '/member', component: Member },
  { name: '게시판', path: '/board', component: Board }
]
