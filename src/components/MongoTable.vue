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
      tbody: tr(v-for='item in sortedList', @click='clickRow(item)', :class='rowClass(item)')
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
      comparator: null,
      descending: false
    }
  }),

  computed: {
    slots () {
      return Object.entries(this.schema).map(([k, v]) => ({ key: k, ...v }))
    },

    sortedList () {
      if (!this.sort.comparator) return this.list
      const copy = [...this.list].sort(this.sort.comparator)
      return this.sort.descending ? copy.reverse() : copy
    }
  },

  methods: {
    clickRow (item) {
      this.selected = item._id === this.selected ? null : item._id
    },

    rowClass (item) {
      return { 'is-selected': item._id === this.selected }
    },

    toggleSort (slot) {
      if (this.sort.key === slot.key) {
        this.sort.descending = !this.sort.descending
      } else {
        this.sort.key = slot.key
        this.sort.descending = false
        this.sort.comparator = (a, b) => slot.sort(a[slot.key], b[slot.key])
      }
    }
  }
}
</script>

<style>

</style>
