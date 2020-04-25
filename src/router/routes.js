import store from './store'
import

const beforeEnter = (to, from, next) => {
  if (store.state.token) {
    next({ path: '/' })
  } else {
    console.log(to, from)
  }
  next()
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: Login,
        meta: { title: 'Login' },
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)

      },
      {
        path: 'register',
        component: Register,
        meta: { title: 'Registro' },
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
