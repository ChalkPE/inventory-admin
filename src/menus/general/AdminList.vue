<template lang="pug">
  .block
    h1.title 운영자 목록 ({{ admins.length }})
    table.table.is-striped.is-bordered.is-fullwidth
      thead: tr: th(v-for='h in heads') {{ h }}
      tbody: tr(v-for='admin of admins', :key='admin.username')
        td: b {{ admin.username }}
        td {{ admin.name }}
        td: a(:href='mailto(admin)') {{ admin.email }}
        td {{ date(admin.joinedDate) }}
        td {{ admin.master ? '마스터' : '' }}
        td: button.button.is-small(@click='remove(admin)') 삭제
</template>

<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState(['admins']),
  data: () => ({ heads: ['아이디', '이름', '이메일', '등록일', '비고', '삭제'] }),

  methods: {
    ...mapActions(['deleteAdmin']),

    mailto (admin) {
      return `mailto:${admin.email}`
    },

    date (string) {
      return moment(string).format('YYYY-MM-DD HH:mm:ss')
    },

    remove (admin) {
      if (!confirm(`${admin.username} 관리자를 제거할까요?`)) return

      this
        .deleteAdmin(admin)
        .catch(err => alert(err.response.data))
    }
  }
}
</script>
