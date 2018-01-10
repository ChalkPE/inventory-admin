<template lang="pug">
  div
    navbar
    section.section.container: router-view
</template>

<script>
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: { Navbar },

  data () {
    return {}
  }
}
</script>
