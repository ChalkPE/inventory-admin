<template lang="pug">
  .block
    h1.title 운영자 추가
    form(@submit='submit')
      .field.is-horizontal: .field-body
        .field
          .control.has-icons-left.is-expanded
            input.input(required, v-model='username', type='text', placeholder='아이디')
            span.icon.is-left: i.fa.fa-at
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
            input.input(required, v-model='email', type='email', placeholder='이메일')
            span.icon.is-left: i.fa.fa-envelope
      .field
        p.control: input.button.is-info(type='submit', value='등록')
</template>

<script>
export default {
  data: () => ({ username: '', password: '', name: '', email: '' }),

  methods: {
    submit () {
      // TODO: POST /admin
      console.log(this.username, this.password, this.name, this.email)
    }
  }

}
</script>
