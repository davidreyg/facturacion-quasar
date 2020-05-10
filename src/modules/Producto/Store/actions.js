import { Notify } from 'quasar'
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const ProductoRepository = RepositoryFactory.get('productos')
export async function fetchProductos ({ commit }) {
  await ProductoRepository.get()
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

export async function fetchOneProducto (context, payload) {
  await ProductoRepository.getOne(payload)
    .then((producto) => {
      // console.log(Producto);
      context.dispatch('openModalEditar', true)
      context.commit('SET_PRODUCTO', producto)
    })
    .catch(err => {
      console.error(err)
    })
}

export function openModalCrear ({ commit }, payload) {
  commit('SET_MODAL_CREAR_ABIERTO', payload)
}
export function openModalEditar ({ commit }, payload) {
  commit('SET_MODAL_EDITAR_ABIERTO', payload)
}

export async function storeProducto (context, payload) {
  console.log(payload)

  await ProductoRepository.create(payload)
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
export async function updateProducto (context, payload) {
  await ProductoRepository.update(payload)
    .then(res => {
      // console.log(res)
      Notify.create({
        position: 'top-right',
        textColor: 'white',
        message: 'Actualizado.'
      })
      context.dispatch('fetchProductos')
      context.dispatch('openModalEditar', false)
      context.commit('SET_PRODUCTO', {})
    })
    .catch(err => {
      console.error(err)
    })
}
export async function deleteProducto (context, payload) {
  await ProductoRepository.destroy(payload)
    .then(res => {
      // console.log(res)
      Notify.create({
        position: 'bottom-right',
        textColor: 'white',
        message: 'Producto eliminada correctamente.'
      })
      context.dispatch('fetchProductos')
    })
    .catch(err => {
      // console.error(err.response)
      Notify.create({
        type: 'negative',
        textColor: 'white',
        message: err.response.data.error
      })
    })
}
