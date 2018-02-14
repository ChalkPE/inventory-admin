<template lang="pug">
  section.section: .container
    mongo-table(name='상품' endpoint='/post' :schema='schema' :fresh='fresh' @expired='fresh = false' @updated='fresh = true' @selected='selected')
      template(slot-scope='p' slot='productTitle'): b {{ p.it }}
      template(slot-scope='p' slot='productSubTitle') {{ p.it }}
      template(slot-scope='p' slot='productCategory'): .field: .control: .select.is-small: select
        option(v-for='c in categories' :selected='p.it === c' @click='selectCategory(p.v, c)') {{ c }}
      template(slot-scope='p' slot='productPrice') {{ p.it.toFixed(2) }}
      template(slot-scope='p' slot='seller') {{ p.it }}
      template(slot-scope='p' slot='uploadDate') {{ p.it | date }}
      template(slot-scope='p' slot='comments'): span(v-if='p.it.length') {{ p.it.length }}개
      template(slot-scope='p' slot='remove'): button.button.is-small(@click='remove(p.v)') 삭제
    mongo-table(v-show='post.productURL' :name='`${post.productTitle} 상품의 댓글`' :endpoint='`/comment/${post.productURL}`' :schema='commentSchema' :fresh='commentFresh' @expired='commentFresh = false' @updated='commentFresh = true')
      template(slot-scope='c' slot='author') {{ c.it }}
      template(slot-scope='c' slot='description') {{ c.it }}
      template(slot-scope='c' slot='remove'): button.button.is-small(@click='removeComment(c.v)') 삭제
</template>

<script>
import api from '../api'
import { mapState } from 'vuex'

import MongoTable from '../components/MongoTable.vue'

export default {
  components: { MongoTable },
  computed: mapState(['token']),

  data: () => ({
    post: {},
    fresh: true,
    commentFresh: true,
    categories: ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Tailoring', 'Accessories'],

    schema: {
      productTitle: { displayName: '상품명', sort: true },
      productSubTitle: { displayName: '디자이너', sort: true },
      productCategory: { displayName: '카테고리', sort: true },
      productPrice: { displayName: '판매가', sort: true },
      seller: { displayName: '판매자', sort: true },
      uploadDate: { displayName: '등록일/수정일', sort: true },
      comments: { displayName: '댓글수' },
      remove: { displayName: '삭제' }
    },

    commentSchema: {
      author: { displayName: '작성자', sort: true },
      description: { displayName: '내용' },
      remove: { displayName: '삭제' }
    }
  }),

  mounted () {
    this.fresh = false
  },

  methods: {
    selected (post) {
      this.post = post
      if (this.post.productURL) this.commentFresh = false
    },

    remove (post) {
      if (!confirm(`${post.productTitle} 상품을 제거할까요?`)) return

      api
        .deletePost(this.token, post)
        .then(() => (this.fresh = false))
        .catch(err => alert(err.response.data))
    },

    selectCategory (post, productCategory) {
      if (post.productCategory === productCategory) return

      api
        .updatePost(this.token, post, { productCategory })
        .then(() => (this.fresh = false))
        .catch(err => alert(err.response.data))
    },

    removeComment (comment) {
      if (!confirm(`${this.post.productTitle} 상품에 달린 ${comment.author}님의 댓글을 제거할까요?`)) return

      api
        .deleteComment(this.token, comment)
        .then(() => { this.fresh = this.commentFresh = false })
        .catch(err => alert(err.response.data))
    }
  }
}
</script>
