import Vue from 'vue'
import moment from 'moment'

Vue.filter('bool', bool => bool ? '예' : '아니오')
Vue.filter('tel', phone => `tel:${phone}`)
Vue.filter('mailto', email => `mailto:${email}`)
Vue.filter('date', isoString => moment(isoString).format('YYYY년 MM월 DD일 HH:mm:ss'))
