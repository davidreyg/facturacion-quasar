import { updateField } from 'vuex-map-fields'

export function SET_CATEGORIAS (state, categorias) {
  state.categorias = categorias
}
export function SET_CATEGORIA (state, categoria) {
  state.categoria = categoria
}
export function SET_MODAL_CREAR_ABIERTO (state, modalCrearAbierto) {
  state.modalCrearAbierto = modalCrearAbierto
}
export function SET_MODAL_EDITAR_ABIERTO (state, modalEditarAbierto) {
  state.modalEditarAbierto = modalEditarAbierto
}
export function updateCategoriaField (state, field) {
  updateField(state.categoria, field)
}
