<template lang="pug">
  section.section: .container
    err(v-if='err', :err='err')
    template(v-else)
      admin-list
      admin-add
</template>

<script>
import { mapActions } from 'vuex'

import AdminAdd from './AdminAdd.vue'
import AdminList from './AdminList.vue'
import Err from '../../components/Err.vue'

export default {
  data: () => ({ err: null }),
  components: { Err, AdminList, AdminAdd },

  methods: mapActions(['getAdmins']),
  mounted () {
    this.getAdmins().catch(err => (this.err = err))
  }
}
</script>
