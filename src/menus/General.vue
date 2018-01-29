<template lang="pug">
  section.section: .container
    error-block(v-if='err', :err='err')
    template(v-else)
      admin-list
      admin-add
</template>

<script>
import { mapActions } from 'vuex'

import AdminAdd from './AdminAdd.vue'
import AdminList from './AdminList.vue'
import ErrorBlock from '../components/ErrorBlock.vue'

export default {
  data: () => ({ err: null }),
  methods: mapActions(['getAdmins']),
  components: { ErrorBlock, AdminList, AdminAdd },
  mounted () { this.getAdmins().catch(err => (this.err = err)) }
}
</script>
