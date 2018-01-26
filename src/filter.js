import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', isoString => moment(isoString).format('YYYY년 MM월 DD일 HH:mm:ss'))
