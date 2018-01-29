<template lang="pug">
  section.section: .container
    error-block(:err='err')
    mongo-table(name='회원', :schema='schema', :list='members')
      template(slot-scope='m', slot='username'): b {{ m.it }}
      template(slot-scope='m', slot='fullName') {{ m.v.firstName }} {{ m.v.lastName }}
      template(slot-scope='m', slot='joinedDate') {{ m.it | date }}
      template(slot-scope='m', slot='email'): a(:href='m.it | mailto') {{ m.it }}
      template(slot-scope='m', slot='mobile'): a(:href='m.it | tel') {{ m.it }}
      template(slot-scope='m', slot='newsletter') {{ m.it | bool }}
      template(slot-scope='m', slot='gender') {{ m.it }}
      template(slot-scope='m', slot='country') {{ m.it }}
      template(slot-scope='m', slot='remove'): button.button.is-small(@click='remove(m.v)') 제재
</template>

<script>
import api from '../api'
import { mapState } from 'vuex'
import MongoTable from '../components/MongoTable.vue'
import ErrorBlock from '../components/ErrorBlock.vue'

export default {
  components: { ErrorBlock, MongoTable },
  computed: mapState(['token']),

  data: () => ({
    err: null,
    members: [],
    schema: {
      username: { displayName: '아이디', sort: String },
      fullName: { displayName: '이름', sort: String },
      joinedDate: { displayName: '회원가입일', sort: Date },
      email: { displayName: '이메일', sort: String },
      mobile: { displayName: '전화번호', sort: Number },
      gender: { displayName: '성별', sort: String },
      country: { displayName: '국가', sort: String },
      newsletter: { displayName: '뉴스레터 동의' },
      remove: { displayName: '제재' }
    }
  }),

  mounted () {
    this.getMember()
  },

  methods: {
    getMember () {
      api
        .getMember(this.token)
        .then(members => {
          this.err = null
          this.members = members
        })
        .catch(err => (this.err = err))
    },

    remove (member) {
      if (!confirm(`${member.username} 회원님을 제재할까요?`)) return

      api
        .deleteMember(this.token, member)
        .then(() => this.getMember())
        .catch(err => alert(err.response.data))
    }
  }
}
</script>
