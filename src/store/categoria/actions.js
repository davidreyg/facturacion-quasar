import { Notify } from 'quasar'
import { RepositoryFactory } from '../../repositories/RepositoryFactory'
const CategoriaRepository = RepositoryFactory.get('categorias')
export async function fetchCategorias ({ commit }) {
  await CategoriaRepository.get()
    .then(categorias => {
      // console.log(categorias.data);
      commit('SET_CATEGORIAS', categorias.data)
      // Notify.create({
      //   type: 'positive',
      //   message: 'La lista de categorias fueron mostradas correctamente.'
      // })
    })
    .catch(err => {
      console.error(err)
    })
}

export async function fetchOneCategoria (context, payload) {
  await CategoriaRepository.getOne(payload)
    .then((categoria) => {
      // console.log(categoria);
      context.dispatch('openModalEditar', true)
      context.commit('SET_CATEGORIA', categoria)
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

export async function storeCategoria (context, payload) {
  await CategoriaRepository.create(payload)
    .then(() => {
      Notify.create({
        position: 'top-right',
        textColor: 'white',
        message: 'Creado.'
      })
      context.dispatch('fetchCategorias')
      context.dispatch('openModalCrear', false)
    })
    .catch(err => {
      console.error(err)
    })
}
export async function updateCategoria (context, payload) {
  await CategoriaRepository.update(payload)
    .then(res => {
      // console.log(res)
      Notify.create({
        position: 'top-right',
        textColor: 'white',
        message: 'Actualizado.'
      })
      context.dispatch('fetchCategorias')
      context.dispatch('openModalEditar', false)
      context.commit('SET_CATEGORIA', {})
    })
    .catch(err => {
      console.error(err)
    })
}
export async function deleteCategoria (context, payload) {
  await CategoriaRepository.destroy(payload)
    .then(res => {
      // console.log(res)
      Notify.create({
        position: 'bottom-right',
        textColor: 'white',
        message: 'Categoria eliminada correctamente.'
      })
      context.dispatch('fetchCategorias')
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
