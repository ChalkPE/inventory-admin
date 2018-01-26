<template lang="pug">
  .block
    dummy-select
    h1.title 운영자 목록 ({{ admins.length }})
    mongo-table(:list='admins', :schema='schema')
      template(slot-scope='a', slot='username'): b {{ a.it }}
      template(slot-scope='a', slot='name') {{ a.it }}
      template(slot-scope='a', slot='email'): a(:href='a.it | mailto') {{ a.it }}
      template(slot-scope='a', slot='joinedDate') {{ a.it | date }}
      template(slot-scope='a', slot='master') {{ a.it ? '마스터' : '' }}
      template(slot-scope='a', slot='remove'): button.button.is-small(@click='remove(a.v)') 삭제
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import MongoTable from '../../components/MongoTable.vue'
import DummySelect from '../../components/DummySelect.vue'

export default {
  components: { MongoTable, DummySelect },
  computed: mapState(['admins']),
  data: () => ({
    schema: {
      username: { displayName: '아이디', sort: (a, b) => a.localeCompare(b) },
      name: { displayName: '이름', sort: (a, b) => a.localeCompare(b) },
      email: { displayName: '이메일', sort: (a, b) => a.localeCompare(b) },
      joinedDate: { displayName: '등록일', sort: (a, b) => moment(a).diff(moment(b)) },
      master: { displayName: '비고' },
      remove: { displayName: '삭제' }
    }
  }),

  methods: {
    ...mapActions(['deleteAdmin']),

    remove (admin) {
      if (!confirm(`${admin.username} 관리자를 제거할까요?`)) return

      this
        .deleteAdmin(admin)
        .catch(err => alert(err.response.data))
    }
  }
}
</script>
