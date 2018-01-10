<template lang="pug">
  #general
    section.hero.is-light: .hero-body: .container
      h1.title 운영자 관리
      h2.subtitle 전체 {{ admins.length }}명
    table.table
</template>

<script>
// import axios from 'axios'
// TODO: vuex store for jwt token

export default {
  data () {
    return { admins: [] }
  }
}
</script>

<style>

</style>
