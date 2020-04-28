import TipoDocumento from './../models/TipoDocumento'
export default {
  get () {
    return TipoDocumento.get()
  },

  getOne (tipoDocumentoId) {
    return TipoDocumento.find(tipoDocumentoId)
  },

  create (payload) {
    const tipoDocumento = new TipoDocumento(payload)
    return tipoDocumento.save()
  },
  update (payload) {
    const tipoDocumento = new TipoDocumento(payload)
    return tipoDocumento.save()
  },

  destroy (tipoDocumento) {
    return tipoDocumento.delete()
  }
}
