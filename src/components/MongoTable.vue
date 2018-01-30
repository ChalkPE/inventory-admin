<template lang="pug">
  .mongo-table
    error-block(v-if='err', :err='err')
    .block(v-else)
      nav.level
        .level-left: .level-item
          h1.title {{ name }} 목록 ({{ page + 1 }}/{{ maxPage + 1 }}, 총 {{ total }}개)

        .level-right
          .level-item: a.button(@click='movePage(-1)', :disabled='page === 0') 이전
          .level-item: a.button(@click='movePage(+1)', :disabled='page === maxPage') 다음
          .level-item: .select: select(v-model='size')
            option(v-for='size of sizes', :value='size') 한 페이지에 {{ size }}개씩 보기

      table.table.is-striped.is-bordered.is-fullwidth
        thead: tr: th(v-for='slot in slots')
          | {{ slot.displayName }}
          span.icon.is-pulled-right(v-show='slot.sort', @click='toggleSort(slot)')
            span.fa-stack
              i.fa.fa-stack-1x.fa-sort.has-text-grey-lighter
              template(v-if='slot.key === sort.key')
                i.fa.fa-stack-1x.fa-sort-desc(v-if='sort.descending')
                i.fa.fa-stack-1x.fa-sort-asc(v-else)
        tbody: tr(v-for='item in list', @click='clickRow(item)', :class='row(item)')
          td(v-for='slot in slots')
            slot(:name='slot.key', v-bind='{v: item, it: item[slot.key]}')
</template>

<script>
import api from '../api'
import { mapState } from 'vuex'
import ErrorBlock from './ErrorBlock'

export default {
  components: { ErrorBlock },

  props: {
    name: { type: String, required: true },
    endpoint: { type: String, required: true },
    fresh: { type: Boolean, required: true },
    schema: { type: Object, required: true }
  },

  computed: {
    ...mapState(['token']),

    slots () {
      return Object.entries(this.schema).map(([k, v]) => ({ key: k, ...v }))
    },

    maxPage () {
      return Math.ceil(this.total / this.size) - 1
    }
  },

  data: () => ({
    err: null,
    page: 0,

    size: 5,
    sizes: [5, 10, 25, 50, 100, 250, 500],

    list: [],
    total: 0,
    selected: null,

    sort: {
      key: null,
      descending: false
    }
  }),

  watch: {
    size () {
      this.page = 0
      this.$emit('expired')
    },

    fresh (fresh) {
      if (fresh) return

      api
        .get(this.token, this.endpoint, { size: this.size, page: this.page })
        .then(({ list, total }) => {
          this.err = null
          this.list = list
          this.total = total
          this.$emit('updated')
        })
        .catch(err => (this.err = err))
    }
  },

  methods: {
    row (item) {
      return { 'is-selected': item._id === this.selected }
    },

    clickRow (item) {
      this.selected = item._id !== this.selected && item._id
    },

    movePage (amount) {
      const nextPage = Math.min(this.maxPage, Math.max(0, this.page + amount))
      if (nextPage !== this.page) {
        this.page = nextPage
        this.$emit('expired')
      }
    },

    toggleSort ({ key, sort }) {
      if (this.sort.key === key) {
        return (this.sort.descending = !this.sort.descending)
      }

      this.sort.key = key
      this.sort.descending = false
    }
  }
}
</script>
