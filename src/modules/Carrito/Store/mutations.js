export function aumentarCantidadProducto (state, { item, cantidad }) {
  item.cantidad += cantidad
}

export function añadirProductoAlCarrito (state, { producto, cantidad }) {
  state.carrito.push({
    producto,
    cantidad
  })
}

export function eliminarProductoDelCarrito (state, index) {
  state.carrito.splice(index, 1)
}

export function vaciarCarrito (state) {
  state.carrito = []
}
