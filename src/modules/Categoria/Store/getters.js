import { getField } from 'vuex-map-fields'

export function getCategorias (state) {
  return state.categorias
}
export function getCategoria (state) {
  return state.categoria
}

export function getModalEditarAbierto (state) {
  return state.modalEditarAbierto
}
export function getModalCrearAbierto (state) {
  return state.modalCrearAbierto
}
export function getCategoriaField (state) {
  return getField(state.categoria)
}
