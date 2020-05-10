import { getField } from 'vuex-map-fields'

export function getProductos (state) {
  return state.productos
}
export function getProducto (state) {
  return state.producto
}

export function getModalEditarAbierto (state) {
  return state.modalEditarAbierto
}
export function getModalCrearAbierto (state) {
  return state.modalCrearAbierto
}
export function getProductoField (state) {
  return getField(state.producto)
}
