<template>
  <div>
    <h1>Login Page</h1>
    <h2 v-if="pending">
      Loading...
    </h2>
    <h2 v-if="error">
      {{ error }}
    </h2>
    <h2 v-if="errorMsg">
      {{ errorMsg }}
    </h2>
    <form @submit.prevent="login(credentials)">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          v-model="credentials.username"
          type="text"
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="credentials.password"
          type="password"
        >
        <button type="submit">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: 'guest' })
// use simple login
const { credentials, pending, errorMsg, error, login, resetError } = useLogin()
// test reset error
onNuxtReady(() => {
  setInterval(() => {
    resetError()
  }, 3000)
})
</script>
