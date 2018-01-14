import axios from 'axios'

const h = token => ({ Authorization: `Bearer ${token}` })

export default {
  async auth (payload) {
    const res = await axios.post('/admin/auth', payload)
    return res.data.token
  },

  async getAdmin (token) {
    const res = await axios.get('/admin', { headers: h(token) })
    return res.data.list
  }
}
