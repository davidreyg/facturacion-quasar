import { updateField } from 'vuex-map-fields'

export function SET_PRODUCTOS (state, productos) {
  state.productos = productos
}
export function SET_PRODUCTO (state, producto) {
  state.producto = producto
}
export function SET_MODAL_CREAR_ABIERTO (state, modalCrearAbierto) {
  state.modalCrearAbierto = modalCrearAbierto
}
export function SET_MODAL_EDITAR_ABIERTO (state, modalEditarAbierto) {
  state.modalEditarAbierto = modalEditarAbierto
}
export function updateProductoField (state, field) {
  updateField(state.producto, field)
}
