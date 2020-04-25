import CategoriasRepository from './categoriasRepository'
import ProductosRepository from './productosRepository'
import TipoDocumentosRepository from './tipoDocumentosRepository'
const repositories = {
  categorias: CategoriasRepository,
  productos: ProductosRepository,
  tipoDocumentos: TipoDocumentosRepository
  // other repositories ...
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
