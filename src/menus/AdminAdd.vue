<template lang="pug">
  .block
    h1.title 운영자 추가
    form(@submit='submit')
      .field.is-horizontal: .field-body
        .field
          .control.has-icons-left.is-expanded
            input.input(required, v-model='username', type='text', placeholder='아이디', :class='{ "is-danger": wrongUsername }')
            span.icon.is-left: i.fa.fa-at
          p.help.is-danger(v-show='wrongUsername') {{ message }}
        .field
          .control.has-icons-left.is-expanded
            input.input(required, v-model='password', type='password', placeholder='비밀번호')
            span.icon.is-left: i.fa.fa-lock
      .field.is-horizontal: .field-body
        .field
          .control.has-icons-left
            input.input(required, v-model='name', type='text', placeholder='이름')
            span.icon.is-left: i.fa.fa-user
        .field
          .control.has-icons-left
            input.input(required, v-model='email', type='email', placeholder='이메일', :class='{ "is-danger": wrongEmail }')
            span.icon.is-left: i.fa.fa-envelope
          p.help.is-danger(v-show='wrongEmail') {{ message }}
      .field
        p.control: input.button.is-info(type='submit', value='등록')
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    err: null,
    username: '',
    password: '',
    name: '',
    email: ''
  }),

  computed: {
    payload () {
      return {
        username: this.username,
        password: this.password,
        name: this.name,
        email: this.email
      }
    },

    message () { return this.err && this.err.response.data },
    wrongEmail () { return this.message && this.message.includes('email') },
    wrongUsername () { return this.message && this.message.includes('username') }
  },

  methods: {
    ...mapActions(['addAdmin']),

    clear () {
      this.err = null
      this.username = this.password = this.name = this.email = ''
    },

    submit () {
      this
        .addAdmin(this.payload)
        .then(() => this.clear())
        .catch(err => (this.err = err))
    }
  }

}
</script>
