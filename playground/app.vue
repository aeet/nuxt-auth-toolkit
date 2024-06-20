<template>
  <nuxt-page />
</template>

<script  lang="ts" setup>
const nuxtApp = useNuxtApp()
nuxtApp.$token.accessToken = '123'
</script>
