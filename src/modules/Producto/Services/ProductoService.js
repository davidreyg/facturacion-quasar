import Service from 'core/Services/Service'
import Producto from '../Model/Producto'
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
    return Service.post(`${resource}`, payload)
  },
  update (payload) {
    const producto = new Producto(payload)
    producto.save()
  },

  destroy (producto) {
    return producto.delete()
  }
}
