import Vue from 'vue'
import Vuex from 'vuex'

import api from '../api'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },

  getters: {
    loggedIn: state => state.token !== null
  },

  actions: {
    async auth (ctx, payload) {
      ctx.commit(types.UPDATE_TOKEN, await api.auth(payload))
    },

    signOut (ctx) {
      ctx.commit(types.UPDATE_TOKEN, null)
    }
  },

  mutations: {
    [types.UPDATE_TOKEN] (state, token) {
      state.token = token || null
    }
  }
})
