import api from '../api'
import * as types from './mutation-types'

export default {
  async auth (ctx, payload) {
    try {
      const token = await api.auth(payload)
      ctx.commit(types.AUTH_ERROR, null)
      ctx.commit(types.UPDATE_TOKEN, token)
      return true
    } catch (err) {
      ctx.commit(types.AUTH_ERROR, err.response.data)
      return false
    }
  }
}
