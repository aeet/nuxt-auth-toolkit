<template>
  <div>
    <h1>you has't  permission</h1>
    <button @click="router.push('/')">
      go home
    </button>
  </div>
</template>

<script setup lang=ts>
definePageMeta({ auth: 'guest' })
const router = useRouter()
</script>
