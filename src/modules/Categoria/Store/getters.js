import { getField } from 'vuex-map-fields'

export function getCategorias (state) {
  // return (campo) => {
  // if (campo) {
  //   return state.categorias.filter(categoria =>
  //     Object.keys(categoria).some(({ nombre }) => categoria[nombre].toString().toLowerCase().includes(campo.toLowerCase())))
  // } else {
  return state.categorias
  // }
  // }
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

export function filtrarCategoriasPorCampo (state) {
  return (campo) => {
    return state.categorias.filter(producto =>
      Object.keys(producto).some(({ nombre }) => producto[nombre].toString().toLowerCase().includes(campo.toLowerCase())))
  }
}
