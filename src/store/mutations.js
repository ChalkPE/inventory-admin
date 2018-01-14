import * as types from './mutation-types'

export default {
  [types.UPDATE_TOKEN] (state, token) {
    state.token = token || null
  },

  [types.UPDATE_ADMINS] (state, admins) {
    state.admins = admins || []
  }
}
