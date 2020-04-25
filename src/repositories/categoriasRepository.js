import Categoria from './../models/Categoria'
export default {
  get () {
    return Categoria.get()
  },

  getOne (categoriaId) {
    return Categoria.find(categoriaId)
  },

  create (payload) {
    const categoria = new Categoria(payload)
    return categoria.save()
  },
  update (payload) {
    const categoria = new Categoria(payload)
    return categoria.save()
  },

  destroy (categoria) {
    return categoria.delete()
  }
}
