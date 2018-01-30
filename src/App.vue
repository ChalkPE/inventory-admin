<template lang="pug">
  #app
    navbar
    router-view
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

<style>
  a, a:hover, a:active, a:focus { outline: none; }
</style>
