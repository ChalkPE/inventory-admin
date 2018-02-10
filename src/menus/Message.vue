<template lang="pug">
  section.section: .container
    mongo-table(name='메세지' :endpoint='endpoint' :schema='schema' :fresh='fresh' @expired='fresh = false' @updated='fresh = true')
      template(slot-scope='m' slot='createdDate') {{ m.it | date }}
      template(slot-scope='m' slot='productURL'): b {{ m.it }}
      template(slot-scope='m' slot='sender'): b {{ m.it }}
      template(slot-scope='m' slot='recipient'): b {{ m.it }}
      template(slot-scope='m' slot='description') {{ m.it }}
      template(slot-scope='m' slot='offerPrice') {{ m.it }}

      template(slot='level'): .field.has-addons
        .control: input.input(v-model='filter' @keyup.enter='updateFilter' type='text' placeholder='검색할 메세지 내용을 입력하세요')
        .control: a.button.is-info(@click='updateFilter') 검색
</template>

<script>
import MongoTable from '../components/MongoTable.vue'
export default {
  components: { MongoTable },
  mounted () { this.fresh = false },

  data: () => ({
    filter: '',
    query: null,

    fresh: true,
    schema: {
      createdDate: { displayName: '전송일', sort: Date },
      productURL: { displayName: '상품', sort: String },
      sender: { displayName: '발신자', sort: String },
      recipient: { displayName: '수신자', sort: String },
      description: { displayName: '내용', sort: String },
      offerPrice: { displayName: '제안 가격', sort: Number }
    }
  }),

  computed: {
    endpoint () {
      return '/message' + (this.query || '')
    }
  },

  methods: {
    updateFilter () {
      this.query = this.filter && '?regex=' + encodeURIComponent(this.filter)
      this.fresh = false
    }
  }
}
</script>
