export function getTotalCarrito (state, getters) {
  return getters.productsOnCart.reduce(
    (total, current) => total + current.precio * current.cantidad,
    0
  )
}

export function getCarrito (state, getters, rootState) {
  return state.carrito.map(item => {
    const product = rootState.tienda.productos.find(
      producto => producto.id === item.id
    )
    return {
      producto: product,
      cantidad: item.cantidad
    }
  })
}
