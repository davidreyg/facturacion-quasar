export default {
  path: 'categorias',
  name: 'home.categorias',
  component: () => import('../Categoria.vue'),
  meta: { auth: true, title: 'Categorias' }

}
