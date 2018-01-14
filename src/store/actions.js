import api from '../api'
import * as types from './mutation-types'

export default {
  async auth (ctx, payload) {
    ctx.commit(types.UPDATE_TOKEN, await api.auth(payload))
  },

  signOut (ctx) {
    ctx.commit(types.UPDATE_TOKEN, null)
    ctx.commit(types.UPDATE_ADMINS, [])
  },

  async getAdmins ({ commit, state }) {
    commit(types.UPDATE_ADMINS, await api.getAdmin(state.token))
  },

  async deleteAdmin ({ commit, state, dispatch }, admin) {
    await api.deleteAdmin(state.token, admin)
    await dispatch('getAdmins')
  },

  async addAdmin ({ commit, state, dispatch }, payload) {
    await api.addAdmin(state.token, payload)
    await dispatch('getAdmins')
  }
}
