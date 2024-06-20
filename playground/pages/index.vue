<template>
  <div>
    <h1>index</h1>
    <div>
      <h2>session</h2>
      <p>{{ session }}</p>
    </div>
    <div>
      <h2>functions</h2>
      <ul>
        <li>
          <button @click="router.push('/test401')">
            test401
          </button>
        </li>
        <li>
          <button @click="nopermisisonTo()">
            no permisison to page
          </button>
        </li>
        <li>
          <button @click="haspermissionTo()">
            has permisison to page
          </button>
        </li>
        <li>
          <button @click="router.push('/permissions')">
            element permissions
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: 'logined' })
const { session } = useSession()

const router = useRouter()

const nopermisisonTo = () => {
  router.push('/acl/1')
}

const haspermissionTo = () => {
  router.push('/user/1')
}
</script>
