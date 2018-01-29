<template lang="pug">
  .block(v-if='err'): article.message.is-danger
    .message-header: p {{ err.message }}
    .message-body {{ status }}
</template>

<script>
export default {
  props: ['err'],
  computed: {
    status () {
      const r = this.err.response
      return r ? `${r.status} ${r.statusText}: ${r.data}` : 'No response'
    }
  }
}
</script>
