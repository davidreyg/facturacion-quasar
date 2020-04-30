import Repository from './Repository'
import Producto from '../models/Producto'
const resource = '/productos'
export default {
  get () {
    return Producto.get()
  },

  getOne (productoId) {
    return Producto.find(productoId)
  },

  create (payload) {
    // const producto = new Producto(payload)
    // return producto.save()
    console.log(payload)
    return Repository.post(`${resource}`, payload)
  },
  update (payload) {
    const producto = new Producto(payload)
    producto.save()
  },

  destroy (producto) {
    return producto.delete()
  }
}
