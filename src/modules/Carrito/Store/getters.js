export function getTotalCarrito (state, getters) {
  console.log(getters.getCarrito)
  return getters.getCarrito.reduce(
    (total, current) => total + current.producto.precio_venta * current.cantidad,
    0
  )
}

export function getCarrito (state, getters, rootState) {
  return state.carrito.map(item => {
    const product = rootState.tienda.productos.find(
      producto => producto.id === item.producto.id
    )

    return {
      producto: product,
      cantidad: item.cantidad,
      totalItem: product.precio_venta * item.cantidad
    }
  })
}
