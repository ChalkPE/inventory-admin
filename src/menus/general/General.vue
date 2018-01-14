<template lang="pug">
  section.section: .container
    err(:err='err')
    admin-list(:list='list')
    add-admin
</template>

<script>
import api from '../../api'
import { mapState } from 'vuex'

import AddAdmin from './AddAdmin.vue'
import AdminList from './AdminList.vue'
import Err from '../../components/Err.vue'

export default {
  components: { Err, AdminList, AddAdmin },
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
