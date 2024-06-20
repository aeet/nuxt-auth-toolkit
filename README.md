# Nuxt Auth Toolkit

The global login status is determined by checking whether the exp attribute of the jwt token obtained from the cookie is expired.

## How to use

example: https://github.com/devcui/nuxt-auth-toolkit/tree/master/playground


## Acl

```ts
// once logged in, users can access
definePageMeta({ auth: 'logined' })
// no information is required to access
definePageMeta({ auth: 'guest' })
// must have the corresponding permission points to access
definePageMeta({ auth: 'acl' })
```

## Native useFetch, etc.

```ts
// no authentication required, useLazyFetch, use....
useFetch('/api/user',{auth:false})
// use authentication, useLazyFetch, use....
useFetch('/api/user',{auth:true})
```

## Default Config

```ts
  baseURL: '/',
  accessToken: {
    path: 'access_token',
    headerName: 'Authorization',
    type: 'Bearer',
    cookie: {
      name: 'natlk.token',
    },
  },
  refreshToken: {
    path: 'refresh_token',
    paramName: 'refreshToken',
    cookie: {
      name: 'natlk.refresh',
    },
  },
  endpoints: {
    login: {
      url: '/auth/login',
      method: 'POST',
      property: 'data',
    },
    logout: {
      url: '/auth/logout',
      method: 'POST',
    },
    refresh: {
      url: '/auth/refresh',
      method: 'POST',
      property: 'data',
    },
    session: {
      url: '/auth/session',
      method: 'GET',
      property: 'data',
      roles: { path: 'roles' },
      groups: { path: 'groups' },
      permissions: { path: 'permissions' },
      pages: {
        path: 'pages',
        property: {
          route: { path: 'route' },
          permissions: { path: 'permissions' },
        },
      },
    },
  },
  cookie: {
    maxAge: 365 * 24 * 60 * 60,
  },
  middleware: {
    auth: {
      enable: true,
    },
  },
  pages: {
    home: '/',
    login: '/login',
    logout: '/logout',
    unauthorized: '/unauthorized',
  }
```

## Composables

- useAccessToken
- useAuthFailure
- useEndpointsProperty
- useLogin
- useLogout
- useNatlkOptions
- usePermission
- useReferer
- useRefersh
- useRefreshToken
- useSession


## Permission


use `v-p:roles`,`v-p:groups`,`v-p:permissions`,`v-p:pages`, `v-pa:roles`,`v-pa:groups`,`v-pa:permissions`,`v-pa:pages` to control element can renderd

```
<template>
  <div>
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
```

