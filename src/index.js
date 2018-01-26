import Vue from 'vue'
import App from './App.vue'

import './filter'
import store from './store'
import router from './router'

export default new Vue({
  store,
  router,
  el: '#root',
  render: (h) => h(App)
})
