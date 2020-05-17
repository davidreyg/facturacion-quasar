export default {
  path: '/tienda',
  name: 'tienda',
  component: () => import('modules/Tienda/Tienda.vue'),
  meta: { auth: true, title: 'Comprar Productos' }

}
