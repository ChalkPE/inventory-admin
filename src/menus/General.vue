<template lang="pug">
  section.section: .container
    error-block(v-if='err', :err='err')
    template(v-else)
      mongo-table(name='운영자', :list='admins', :schema='schema')
        template(slot-scope='a', slot='username'): b {{ a.it }}
        template(slot-scope='a', slot='name') {{ a.it }}
        template(slot-scope='a', slot='email'): a(:href='a.it | mailto') {{ a.it }}
        template(slot-scope='a', slot='joinedDate') {{ a.it | date }}
        template(slot-scope='a', slot='master') {{ a.it ? '마스터' : '' }}
        template(slot-scope='a', slot='remove'): button.button.is-small(@click='remove(a.v)') 삭제
      admin-add(@added='getAdmins')
</template>

<script>
import api from '../api'
import { mapState } from 'vuex'
import AdminAdd from './AdminAdd.vue'
import ErrorBlock from '../components/ErrorBlock.vue'
import MongoTable from '../components/MongoTable.vue'

export default {
  computed: mapState(['token']),
  components: { AdminAdd, MongoTable, ErrorBlock },
  mounted () { this.getAdmins() },

  data: () => ({
    err: null,
    admins: [],

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
    getAdmins () {
      api
        .get(this.token, '')
        .then(list => (this.admins = list))
        .catch(err => (this.err = err))
    },

    remove (admin) {
      if (!confirm(`${admin.username} 관리자를 제거할까요?`)) return

      api
        .deleteAdmin(this.token, admin)
        .then(() => this.getAdmins())
        .catch(err => (this.err = err))
    }
  }
}
</script>
