import { Notify } from 'quasar'
import { ServiceFactory } from 'core/Services/ServiceFactory'
const ProductoService = ServiceFactory.get('productos')
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

export async function fetchOneProducto (context, producto) {
  await ProductoService.getOne(producto)
    .then((producto) => {
      // console.log(Producto);
      context.dispatch('openModalEditar', true)
      context.commit('SET_PRODUCTO', producto)
    })
    .catch(err => {
      console.error(err)
    })
}

export function openModalCrear ({ commit }, producto) {
  commit('SET_MODAL_CREAR_ABIERTO', producto)
}
export function openModalEditar ({ commit }, producto) {
  commit('SET_MODAL_EDITAR_ABIERTO', producto)
}

export async function storeProducto (context, producto) {
  console.log(producto)

  await ProductoService.create(producto)
    .then(() => {
      Notify.create({
        position: 'top-right',
        textColor: 'white',
        message: 'Creado.'
      })
      context.dispatch('fetchProductos')
      context.dispatch('openModalCrear', false)
    })
    .catch(err => {
      console.error(err)
    })
}
export async function updateProducto (context, producto) {
  await ProductoService.update(producto)
    .then(res => {
      // console.log(res)
      context.dispatch('fetchProductos')
      context.dispatch('openModalEditar', false)
    })
    .catch(err => {
      console.error(err)
    })
}
export async function deleteProducto (context, producto) {
  await ProductoService.destroy(producto)
    .then(res => {
      // console.log(res)
      context.dispatch('fetchProductos')
    })
}
export async function emptyProductoSleccionado (context) {
  context.commit('SET_PRODUCTO', {})
}
