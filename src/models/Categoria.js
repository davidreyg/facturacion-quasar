import Model from './Model'
import Producto from './Producto'

export default class Categoria extends Model {
  resource () {
    return 'categorias'
  }

  productos () {
    return this.hasMany(Producto)
  }
}
