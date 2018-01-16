import axios from 'axios'

const h = token => ({ headers: { Authorization: `Bearer ${token}` } })

export default {
  async auth (payload) {
    const res = await axios.post('/admin/auth', payload)
    return res.data.token
  },

  async getAdmin (token) {
    const res = await axios.get('/admin', h(token))
    return res.data.list
  },

  async deleteAdmin (token, { username }) {
    const res = await axios.delete(`/admin/${username}`, h(token))
    return res.data.success
  },

  async addAdmin (token, payload) {
    const res = await axios.post('/admin', payload, h(token))
    return res.data.success
  }
}
