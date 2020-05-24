export function getProductos (state) {
  return state.productos
}

export function getCategorias (state) {
  return state.categorias
}

export function getProducto (state) {
  return state.producto
}

export function filtrarProductosPorCampo (state) {
  return (campo) => {
    return state.productos.filter(producto =>
      Object.keys(producto).some(valor => producto[valor].toString().toLowerCase().includes(campo.toLowerCase())))
  }
}
