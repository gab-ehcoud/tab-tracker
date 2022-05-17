<template>
  <div>
    <h1>Register</h1>

    <input
      type="email"
      name="email"
      v-model='email'
      placeholder="Email"
    />
    <br/>
    <br/>
    <input
      type="password"
      name="password"
      v-model='password'
      placeholder="Password"
    />
    <br/>
    <div class='error' v-html="error" />
    <br/>
    <button
      @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService.js'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
