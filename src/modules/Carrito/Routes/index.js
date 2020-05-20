// ESTE ES UN CHILD DE TIENDA
export default {
  path: '/carrito',
  component: () => import('modules/Carrito/Carrito.vue'),
  meta: { auth: true, title: 'Carrito' }

}
