<template lang="pug">
  #adminList
    h1.title 운영자 목록
    table.table.is-striped.is-bordered
      thead: tr: th(v-for='h in heads') {{ h }}
      tbody: tr(v-for='admin of list')
        td: b {{ admin.username }}
        td {{ admin.name }}
        td: a(:href='mailto(admin)') {{ admin.email }}
        td {{ date(admin.joinedDate) }}
        td: button.button.is-small 삭제
    | 현재 총 <b>{{ list.length }}명</b>의 관리자가 있습니다.
    | 다른 관리자를 더 추가하려면 <b>마스터 계정</b>으로 로그인하세요.
</template>

<script>
import moment from 'moment'

export default {
  props: ['list'],

  data: () => ({
    heads: ['아이디', '이름', '이메일', '등록일', '삭제']
  }),

  methods: {
    mailto (admin) {
      return `mailto:${admin.email}`
    },

    date (string) {
      return moment(string).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style>

</style>
