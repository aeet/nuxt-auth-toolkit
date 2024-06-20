<template>
  <div>
    <h1>test 401</h1>
    <button @click="execute()">
      click
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: 'logined' })

const { execute } = useFetch('/api/401', { method: 'get', immediate: false })
</script>
