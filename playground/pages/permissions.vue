<template>
  <div>
    <h1>Element Permissions</h1>
    <p>{{ session }}</p>
    <div>
      <h2>Role</h2>
      <div>
        <h3>Some Point</h3>
        <div v-p:roles="['teacher']">
          Teacher
        </div>
        <div v-p:roles="['teacher', 'student']">
          Student
        </div>
        <div v-p:roles="['admin']">
          Admin
        </div>
      </div>
      <div>
        <h3>All Point</h3>
        <div v-pa:roles="['teacher']">
          Teacher
        </div>
        <div v-pa:roles="['teacher', 'student']">
          Student
        </div>
        <div v-pa:roles="['admin']">
          Admin
        </div>
      </div>
    </div>

    <div>
      <h2>Group</h2>
      <div>
        <h3>Some Point</h3>
        <div v-p:groups="['student']">
          Student Group
        </div>
        <div v-p:groups="['teacher', 'admin']">
          Teacher or Admin Group
        </div>
      </div>
      <div>
        <h3>All Point</h3>
        <div v-pa:groups="['student']">
          Student Group
        </div>
        <div v-pa:groups="['teacher', 'admin']">
          Teacher and Admin Group
        </div>
      </div>
    </div>

    <div>
      <h2>Permissions</h2>
      <div>
        <h3>Some Point</h3>
        <div v-p:permissions="['query']">
          Query Permission
        </div>
        <div v-p:permissions="['add', 'edit']">
          Add or Edit Permission
        </div>
      </div>
      <div>
        <h3>All Point</h3>
        <div v-pa:permissions="['query']">
          Query Permission
        </div>
        <div v-pa:permissions="['add', 'edit']">
          Add and Edit Permission
        </div>
      </div>
    </div>

    <div>
      <h2>Page</h2>
      <div>
        <h3>Some Point</h3>
        <div v-p:pages="['remove']">
          Remove Permission on Page
        </div>
        <div v-p:pages="['add', 'edit']">
          Add or Edit Permission on Page
        </div>
      </div>
      <div>
        <h3>All Point</h3>
        <div v-pa:pages="['remove']">
          Remove Permission on Page
        </div>
        <div v-pa:pages="['add', 'edit']">
          Add and Edit Permission on Page
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: 'logined' })
const { session } = useSession()
</script>
