<template lang="pug">
  section.section: .container
    mongo-table(name='운영자', unit='명', endpoint='', :schema='schema', :fresh='fresh', @expired='fresh = false', @updated='fresh = true')
      template(slot-scope='a', slot='username'): b {{ a.it }}
      template(slot-scope='a', slot='name') {{ a.it }}
      template(slot-scope='a', slot='email'): a(:href='a.it | mailto') {{ a.it }}
      template(slot-scope='a', slot='joinedDate') {{ a.it | date }}
      template(slot-scope='a', slot='master') {{ a.it ? '마스터' : '' }}
      template(slot-scope='a', slot='remove'): button.button.is-small(@click='remove(a.v)') 삭제
    admin-add(@added='fresh = false')
</template>

<script>
import api from '../api'
import { mapState } from 'vuex'
import AdminAdd from './AdminAdd.vue'
import MongoTable from '../components/MongoTable.vue'

export default {
  computed: mapState(['token']),
  components: { AdminAdd, MongoTable },
  mounted () { this.fresh = false },

  data: () => ({
    fresh: true,
    schema: {
      username: { displayName: '아이디', sort: String },
      name: { displayName: '이름', sort: String },
      email: { displayName: '이메일', sort: String },
      joinedDate: { displayName: '등록일', sort: Date },
      master: { displayName: '비고' },
      remove: { displayName: '삭제' }
    }
  }),

  methods: {
    remove (admin) {
      if (!confirm(`${admin.username} 관리자를 제거할까요?`)) return

      api
        .deleteAdmin(this.token, admin)
        .then(() => (this.fresh = false))
        .catch(err => (this.err = err))
    }
  }
}
</script>
