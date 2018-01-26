<template lang="pug">
  section.section: .container
    error-block(:err='err')
    h1.title 상품 목록 ({{ posts.length }})
    mongo-table(:schema='schema', :list='posts')
      template(slot-scope='post', slot='productTitle'): b {{ post.it }}
      template(slot-scope='post', slot='productSubTitle') {{ post.it }}
      template(slot-scope='post', slot='productCategory') {{ post.it }}
      template(slot-scope='post', slot='productPrice') {{ post.it.toFixed(2) }}
      template(slot-scope='post', slot='seller') {{ post.it }}
      template(slot-scope='post', slot='uploadDate') {{ post.it | date }}
      template(slot-scope='post', slot='remove'): button.button.is-small(@click='remove(post.item)') 삭제
</template>

<script>
import api from '../api'
import moment from 'moment'
import { mapState } from 'vuex'

import MongoTable from '../components/MongoTable.vue'
import ErrorBlock from '../components/ErrorBlock.vue'

export default {
  components: { MongoTable, ErrorBlock },
  computed: mapState(['token']),

  data: () => ({
    err: null,
    posts: [],

    schema: {
      slots: [
        {
          key: 'productTitle',
          displayName: '상품명',
          sort: (a, b) => a.localeCompare(b)
        },

        {
          key: 'productSubTitle',
          displayName: '디자이너',
          sort: (a, b) => a.localeCompare(b)
        },

        {
          key: 'productCategory',
          displayName: '카테고리',
          sort: (a, b) => a.localeCompare(b)
        },

        {
          key: 'productPrice',
          displayName: '판매가',
          sort: (a, b) => a - b
        },

        {
          key: 'seller',
          displayName: '판매자',
          sort: (a, b) => a.localeCompare(b)
        },

        {
          key: 'uploadDate',
          displayName: '등록일/수정일',
          sort: (a, b) => moment(a).diff(moment(b))
        },

        { key: 'remove', displayName: '삭제' }
      ]
    }
  }),

  mounted () {
    this.getPost()
  },

  methods: {
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
