export default {
  path: 'productos',
  name: 'home.productos',
  component: () => import('modules/Producto/Producto.vue'),
  meta: { auth: true, title: 'Productos' }

}
