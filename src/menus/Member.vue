<template lang="pug">
  section.section: .container
    mongo-table(name='회원', unit='명' endpoint='/user', :schema='schema', :fresh='fresh', @expired='fresh = false', @updated='fresh = true')
      template(slot-scope='m', slot='username'): b {{ m.it }}
      template(slot-scope='m', slot='fullName') {{ m.v.firstName }} {{ m.v.lastName }}
      template(slot-scope='m', slot='joinedDate') {{ m.it | date }}
      template(slot-scope='m', slot='email'): a(:href='m.it | mailto') {{ m.it }}
      template(slot-scope='m', slot='mobile'): a(:href='m.it | tel') {{ m.it }}
      template(slot-scope='m', slot='newsletter') {{ m.it | bool }}
      template(slot-scope='m', slot='gender') {{ m.it }}
      template(slot-scope='m', slot='country') {{ m.it }}
      template(slot-scope='m', slot='bannedUntil')
        button.button.is-small(:disabled='isBannedNow(m.v)' @click='remove(m.v)' :title='m.it') 제재{{ isBannedNow(m.v) ? '완료' : '하기' }}
</template>

<script>
import api from '../api'
import { mapState } from 'vuex'
import MongoTable from '../components/MongoTable.vue'

export default {
  components: { MongoTable },
  computed: mapState(['token']),

  data: () => ({
    fresh: true,
    schema: {
      username: { displayName: '아이디', sort: String },
      fullName: { displayName: '이름', sort: String },
      joinedDate: { displayName: '회원가입일', sort: Date },
      email: { displayName: '이메일', sort: String },
      mobile: { displayName: '전화번호', sort: Number },
      gender: { displayName: '성별', sort: String },
      country: { displayName: '국가', sort: String },
      newsletter: { displayName: '뉴스레터 동의' },
      bannedUntil: { displayName: '제재' }
    }
  }),

  mounted () { this.fresh = false },

  methods: {
    isBannedNow (member) {
      return Date.now() < new Date(member.bannedUntil).getTime()
    },

    remove (member) {
      const { username } = member
      if (!confirm(`${username} 회원님을 제재할까요?`)) return

      const amount = Number(prompt(`며칠 동안 ${username} 회원님을 제재할까요?`, 3))
      if (isNaN(amount) || amount < 1) return alert('취소되었습니다')

      const bannedUntil = new Date()
      bannedUntil.setDate(bannedUntil.getDate() + amount)

      api
        .deleteUser(this.token, member, bannedUntil)
        .then(() => (this.fresh = false))
        .catch(err => alert(err.response.data))
    }
  }
}
</script>
