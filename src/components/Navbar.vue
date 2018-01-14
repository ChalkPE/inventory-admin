<template lang="pug">
  nav.navbar.is-dark(role='navigation'): .container
    .navbar-brand
      a.navbar-item Inventory
      .navbar-burger(@click='active = !active')
        span
        span
        span
    .navbar-menu(:class='{ "is-active": active }')
      .navbar-start(v-if='loggedIn')
        router-link.navbar-item(v-for='m of menus.start', :key='m.name', :to='m.path') {{ m.name }}

      .navbar-end
        a.navbar-item(v-if='loggedIn', @click='signOutAndRedirect') 로그아웃
        router-link.navbar-item(v-else, :to='menus.auth.path') {{ menus.auth.name }}
</template>

<script>
import menus from '../menus'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',

  data: () => ({ menus, active: false }),
  computed: mapGetters(['loggedIn']),

  methods: {
    ...mapActions(['signOut']),

    signOutAndRedirect () {
      this.signOut()
      this.$router.push({ name: '로그인' })
    }
  }
}
</script>
