import CategoriaService from 'modules/Categoria/Services/CategoriaService'
import ProductoService from 'modules/Producto/Services/ProductoService'
// import TipoDocumentoService from './TipoDocumentoService'
const services = {
  categorias: CategoriaService,
  productos: ProductoService
  // tipoDocumentos: TipoDocumentoService
  // other repositories ...
}

export const ServiceFactory = {
  get: name => services[name]
}
