import store from '../Store'
import CategoriaRoutes from 'modules/Categoria/Routes'
import ProductoRoutes from 'modules/Producto/Routes'
import TiendaRoutes from 'modules/Tienda/Routes'
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
    component: () => import('core/Layouts/MainLayout.vue'),
    meta: { auth: true, title: 'Inicio' },
    children: [
      {
        path: '',
        component: () => import('core/Pages/Index.vue'),
        meta: { auth: true, title: 'Inicio' }
      },
      CategoriaRoutes,
      ProductoRoutes
    ]
  },
  TiendaRoutes,
  {
    path: '/auth',
    name: 'auth',
    component: () => import('core/Pages/auth/Auth.vue'),
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('core/Pages/auth/Login.vue'),
        meta: { title: 'Login' },
        beforeEnter: (to, from, next) => beforeEnter(to, from, next)
      },
      {
        path: 'register',
        component: () => import('core/Pages/auth/Register.vue'),
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
// if (process.env.MODE !== 'ssr') {
//   routes.push({
//     path: '*',
//     component: () => import('core/Pages/Error404.vue')
//   })
// }

export default routes
