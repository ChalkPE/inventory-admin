<template lang="pug">
  .block(v-if='err')
    article.message.is-danger
      .message-header: p {{ message }}
      .message-body {{ status }}: {{ response.data }}
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
