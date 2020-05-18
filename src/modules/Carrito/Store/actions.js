// import { Notify } from 'quasar'
export async function añadirProductoAlCarrito (context, { producto, cantidad }) {
  if (producto.stock === 0) return
  const item = context.state.carrito.find(item => item.producto.id === producto.id)
  if (item) {
    context.commit('aumentarCantidadProducto', { item, cantidad })
  } else {
    context.commit('añadirProductoAlCarrito', { producto, cantidad })
  }
  // context.commit('decrementProductInventory', { producto, cantidad })
}
