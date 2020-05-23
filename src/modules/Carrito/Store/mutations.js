export function aumentarCantidadProducto (state, { item, cantidad }) {
  item.cantidad += cantidad
}

export function añadirProductoAlCarrito (state, { producto, cantidad }) {
  state.carrito.push({
    producto,
    cantidad
  })
}

export function eliminarProductoDelCarrito (state, productoId) {
  state.carrito.splice(productoId, 1)
}

export function vaciarCarrito (state) {
  state.carrito = []
}
