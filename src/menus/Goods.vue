<template lang="pug">
  section.section: .container
    error-block(:err='err')
    mongo-table(name='상품', :schema='schema', :list='posts')
      template(slot-scope='p', slot='productTitle'): b {{ p.it }}
      template(slot-scope='p', slot='productSubTitle') {{ p.it }}
      template(slot-scope='p', slot='productCategory') {{ p.it }}
      template(slot-scope='p', slot='productPrice') {{ p.it.toFixed(2) }}
      template(slot-scope='p', slot='seller') {{ p.it }}
      template(slot-scope='p', slot='uploadDate') {{ p.it | date }}
      template(slot-scope='p', slot='remove'): button.button.is-small(@click='remove(p.v)') 삭제
</template>

<script>
import api from '../api'
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
      productTitle: {
        displayName: '상품명',
        sort: String
      },

      productSubTitle: {
        displayName: '디자이너',
        sort: String
      },

      productCategory: {
        displayName: '카테고리',
        sort: String
      },

      productPrice: {
        displayName: '판매가',
        sort: Number
      },

      seller: {
        displayName: '판매자',
        sort: String
      },

      uploadDate: {
        displayName: '등록일/수정일',
        sort: Date
      },

      remove: { displayName: '삭제' }
    }
  }),

  mounted () {
    this.getPost()
  },

  methods: {
    getPost () {
      api
        .getPost(this.token)
        .then(posts => {
          this.err = null
          this.posts = posts
        })
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
