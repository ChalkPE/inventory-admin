<template lang="pug">
  section.section: .container
    error-block(:err='err')
    .block
      h1.title 회원 목록 ({{ members.length }})
      table.table.is-striped.is-bordered.is-fullwidth
        thead: tr: th(v-for='h in heads') {{ h }}
        tbody: tr(v-for='member of members', :key='member.username')
          td: b {{ member.username }}
          td {{ member.firstName }} {{ member.lastName }}
          td {{ date(member.joinedDate) }}
          td: a(:href='mailto(member)') {{ member.email }}
          td {{ member.newsletter ? '예' : '아니오' }}
          td {{ member.gender }}
          td {{ member.country }}
          td: button.button.is-small(@click='remove(member)') 제재
</template>

<script>
import api from '../api'
import moment from 'moment'
import { mapState } from 'vuex'
import ErrorBlock from '../components/ErrorBlock.vue'

export default {
  components: { ErrorBlock },
  computed: mapState(['token']),

  data: () => ({
    err: null,
    members: [],
    heads: ['아이디/닉네임', '이름', '회원가입일', '이메일', '뉴스레터 동의', '성별', '국가', '제재']
  }),

  mounted () {
    this.getMember()
  },

  methods: {
    date (string) {
      return moment(string).format('YYYY-MM-DD HH:mm:ss')
    },

    mailto (member) {
      return `mailto:${member.email}`
    },

    getMember () {
      api
        .getMember(this.token)
        .then(members => (this.members = members))
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
