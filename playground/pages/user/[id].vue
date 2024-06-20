<template>
  <div>
    <h1>user</h1>
    <h1>you has this page permission</h1>
    pattern: {{ route.matched[0].path }}
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: 'acl' })
const route = useRoute()
</script>
