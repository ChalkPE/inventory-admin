<template lang="pug">
  .block
    dummy-select
    h1.title {{ name }} 목록 ({{ list.length }})
    table.table.is-striped.is-bordered.is-fullwidth
      thead: tr: th(v-for='slot in slots')
        | {{ slot.displayName }}
        span.icon.is-pulled-right(v-show='slot.sort', @click='toggleSort(slot)')
          span.fa-stack
            i.fa.fa-stack-1x.fa-sort.has-text-grey-lighter
            template(v-if='slot.key === sort.key')
              i.fa.fa-stack-1x.fa-sort-desc(v-if='sort.descending')
              i.fa.fa-stack-1x.fa-sort-asc(v-else)
      tbody: tr(v-for='item in sortedList', @click='clickRow(item)', :class='row(item)')
        td(v-for='slot in slots')
          slot(:name='slot.key', v-bind='{v: item, it: item[slot.key]}')
</template>

<script>
import DummySelect from './DummySelect.vue'

export default {
  components: { DummySelect },

  props: {
    name: { type: String, required: true },
    list: { type: Array, required: true },
    schema: { type: Object, required: true }
  },

  data: () => ({
    selected: null,
    sort: {
      key: null,
      descending: false
    }
  }),

  computed: {
    slots () {
      return Object.entries(this.schema).map(([k, v]) => ({ key: k, ...v }))
    }
  },

  methods: {
    row (item) {
      return { 'is-selected': item._id === this.selected }
    },

    clickRow (item) {
      this.selected = item._id !== this.selected && item._id
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
