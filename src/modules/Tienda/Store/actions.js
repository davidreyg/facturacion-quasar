// import { Notify } from 'quasar'
import { ServiceFactory } from 'core/Services/ServiceFactory'
const ProductoService = ServiceFactory.get('productos')
const CategoriaService = ServiceFactory.get('categorias')
export async function fetchProductos ({ commit }) {
  await ProductoService.get()
    .then(productos => {
      // console.log(Productos.data);
      commit('SET_PRODUCTOS', productos.data)
      // Notify.create({
      //   type: 'positive',
      //   message: 'La lista de Productos fueron mostradas correctamente.'
      // })
    })
    .catch(err => {
      console.error(err)
    })
}

export async function fetchCategorias ({ commit }) {
  await CategoriaService.get()
    .then(categorias => {
      // console.log(Productos.data);
      commit('SET_CATEGORIAS', categorias.data)
      // Notify.create({
      //   type: 'positive',
      //   message: 'La lista de Productos fueron mostradas correctamente.'
      // })
    })
    .catch(err => {
      console.error(err)
    })
}

export async function verDetallesProducto (context, idProducto) {
  await ProductoService.getOne(idProducto)
    .then((producto) => {
      // console.log(Producto);
      // context.dispatch('openModalEditar', true)
      context.commit('SET_PRODUCTO', producto)
    })
    .catch(err => {
      console.error(err)
    })
}
