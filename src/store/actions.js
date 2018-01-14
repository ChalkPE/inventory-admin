import api from '../api'
import * as types from './mutation-types'

export default {
  async auth (ctx, payload) {
    ctx.commit(types.UPDATE_TOKEN, await api.auth(payload))
  },

  signOut (ctx) {
    ctx.commit(types.UPDATE_TOKEN, null)
  },

  async getAdmins ({ commit, state }) {
    commit(types.UPDATE_ADMINS, await api.getAdmin(state.token))
  },

  async deleteAdmin ({ commit, state, dispatch }, admin) {
    await api.deleteAdmin(state.token, admin)
    await dispatch('getAdmins')
  }
}
