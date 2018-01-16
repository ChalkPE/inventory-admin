<template lang="pug">
  section.section: .container
    error-block(:err='err')
    .block
      h1.title 상품 목록 ({{ posts.length }})
      table.table.is-striped.is-bordered.is-fullwidth
        thead: tr: th(v-for='h in heads') {{ h }}
        tbody: tr(v-for='post of posts', :key='post.productURL')
          td: b {{ post.productTitle }}
          td {{ post.productPrice }}
          td {{ post.seller }}
          td {{ date(post.uploadDate) }}
          td: button.button.is-small(@click='remove(post)') 삭제
</template>

<script>
import api from '../api'
import moment from 'moment'
import { mapState } from 'vuex'
import ErrorBlock from '../components/ErrorBlock.vue'

export default {
  components: { ErrorBlock },
  computed: mapState(['token']),

  data: () => ({
    err: null,
    posts: [],
    heads: ['상품명', '판매가', '판매자', '등록일/수정일', '삭제']
  }),

  mounted () {
    this.getPost()
  },

  methods: {
    date (string) {
      return moment(string).format('YYYY-MM-DD HH:mm:ss')
    },

    getPost () {
      api
        .getPost(this.token)
        .then(posts => (this.posts = posts))
        .catch(err => (this.err = err))
    },

    remove (post) {
      if (!confirm(`${post.productTitle} 상품을 제거할까요?`)) return

      api
        .deletePost(this.token, post)
        .then(() => this.getPost())
        .catch(err => alert(err.response.data))
    }
  }
}
</script>
