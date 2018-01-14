<template lang="pug">
  section.section(v-if='err'): .container
    h1.title 오류가 발생했습니다
    .notification.is-danger
      b {{ message }}
      br
      | {{ status }} - {{ response.data }}
</template>

<script>
export default {
  props: ['err'],
  computed: {
    message () { return this.err.message },
    response () { return this.err.response },
    status () { return this.response.status + ' ' + this.response.statusText }
  }
}
</script>
