import store from '../store'

const beforeEnter = (to, from, next) => {
  // console.log(store().state)
  if (store().state.token) {
    next({ path: '/' })
  } else {
    // console.log(to, from)
  }
  next()
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { auth: true, title: 'Inicio' },
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: { auth: true, title: 'Inicio' }
      },
      {
        path: 'categorias',
        name: 'home.categorias',
        component: () => import('pages/categoria/Categoria.vue'),
        meta: { auth: true, title: 'Categorias' }

      },
      {
        path: 'productos',
        name: 'home.productos',
        component: () => import('pages/producto/Producto.vue'),
        meta: { auth: true, title: 'Productos' }

      }

    ]
  },
  {
    path: '/tienda',
    name: 'tienda',
    component: () => import('pages/tienda/Tienda.vue'),
    meta: { auth: true, title: 'Comprar Productos' }

  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('pages/auth/Auth.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('pages/auth/Login.vue'),
        meta: { title: 'Login' },
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
      },
      {
        path: 'register',
        component: () => import('pages/auth/Register.vue'),
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
