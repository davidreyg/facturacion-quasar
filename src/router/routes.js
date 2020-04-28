import store from '../store'
import Auth from '../pages/auth/Auth'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Categoria from '../pages/categoria/Categoria'
import Producto from '../pages/producto/Producto'
import Tienda from '../pages/tienda/Tienda'

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
        component: Categoria,
        meta: { auth: true, title: 'Categorias' }

      },
      {
        path: 'productos',
        name: 'home.productos',
        component: Producto,
        meta: { auth: true, title: 'Productos' }

      }

    ]
  },
  {
    path: '/tienda',
    name: 'tienda',
    component: Tienda,
    meta: { auth: true, title: 'Comprar Productos' }

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
