import Producto from '../models/Producto'
export default {
  get () {
    return Producto.get()
  },

  getOne (productoId) {
    return Producto.find(productoId)
  },

  create (payload) {
    const producto = new Producto(payload)
    return producto.save()
  },
  update (payload) {
    const producto = new Producto(payload)
    return producto.save()
  },

  destroy (producto) {
    return producto.delete()
  }
}
