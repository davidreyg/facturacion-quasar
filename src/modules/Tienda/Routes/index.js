import carritoRoutes from 'modules/Carrito/Routes'

export default {
  path: '/tienda',
  name: 'tienda',
  component: () => import('modules/Tienda/Tienda.vue'),
  meta: { auth: true, title: 'Comprar Productos' },
  children: [
    {
      path: '/',
      component: () => import('modules/Tienda/Components/ProductoTiendaList'),
      meta: { auth: true, title: 'Inicio' }
    },
    carritoRoutes
  ]

}
