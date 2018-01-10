<template lang="pug">
  #navbar
    nav.navbar.is-dark(role='navigation'): .container
      .navbar-brand
        a.navbar-item Inventory
        .navbar-burger(data-target='menu', @click='active = !active')
          span
          span
          span
      #menu.navbar-menu(:class='{ "is-active": active }')
        .navbar-start
          router-link.navbar-item(v-for='m of menus.start', :key='m.name', :to='m.path') {{ m.name }}
        .navbar-end
          router-link.navbar-item(:to='menus.auth.path') {{ menus.auth.name }}
</template>

<script>
import menus from '../menus'

export default {
  name: 'Navbar',

  data () {
    return {
      menus,
      active: false
    }
  }
}
</script>

<style>

</style>
