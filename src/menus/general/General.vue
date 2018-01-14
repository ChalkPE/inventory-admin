<template lang="pug">
  #general
    section.hero.is-info: .hero-body: .container
      h1.title 운영자 관리
    err(:err='err')
    section.section: .container
      admin-list(:list='list')
      hr
      h1.title 운영자 추가 등록
</template>

<script>
import { mapState } from 'vuex'

import api from '../../api'
import Err from '../../components/Err.vue'
import AdminList from './AdminList.vue'

export default {
  components: { Err, AdminList },
  computed: mapState(['token']),
  data: () => ({ err: null, list: [] }),

  mounted () {
    api
      .getAdmin(this.token)
      .then(list => (this.list = list))
      .catch(err => console.error(this.err = err))
  }
}
</script>

<style>

</style>
