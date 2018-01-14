<template lang="pug">
  #auth
    section.hero.is-info.is-bold: .hero-body
      .container: h1.title 어드민 로그인
    section.section: .container
      form(@submit='submit')
        .field
          p.control.has-icons-left
            input.input(required, type='text', placeholder='아이디', v-model='username', :class='{ "is-danger": wrongUsername }')
            span.icon.is-left: i.fa.fa-at
          p.help.is-danger(v-show='wrongUsername') {{ message }}
        .field
          p.control.has-icons-left
            input.input(required, type='password', placeholder='비밀번호', v-model='password', :class='{ "is-danger": wrongPassword }')
            span.icon.is-left: i.fa.fa-lock
          p.help.is-danger(v-show='wrongPassword') {{ message }}
        .field
          p.control: input.button.is-info(type='submit', value='로그인')
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({ err: null, username: '', password: '' }),

  methods: {
    ...mapActions(['auth']),

    submit () {
      this
        .auth(this.payload)
        .then(() => this.$router.push({ name: '기본설정' }))
        .catch(err => (this.err = err))
    }
  },

  computed: {
    payload () { return { username: this.username, password: this.password } },
    message () { return this.err && this.err.response.data },
    wrongUsername () { return this.message === 'Unidentified account' },
    wrongPassword () { return this.message === 'Wrong password' }
  }
}
</script>
