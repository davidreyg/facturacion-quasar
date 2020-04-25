import Model from './Model'

export default class Producto extends Model {
  resource () {
    return 'productos'
  }

  // categoria() {
  //     return this.belongsTo(Categoria);
  // }
}
