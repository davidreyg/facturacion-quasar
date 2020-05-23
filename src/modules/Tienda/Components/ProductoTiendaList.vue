<template>
  <div class="row fit q-pa-md q-gutter-sm">
    <div class="col-12">
      <q-input
        v-model="campo"
        type="text"
        label="Buscar"
        @keyup="buscarProductos"
      />
    </div>
    <div class="col-12">
      <div class="row fit">
        <producto-card
          v-for="producto in productos"
          :key="producto.id"
          :producto="producto"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductoCard from './ProductoCard'

export default {
  name: 'ProductoTiendaList',
  components: {
    ProductoCard
  },

  data () {
    return {
      campo: '',
      productos: []
    }
  },
  async created () {
    await this.fetchProductos()
    this.productos = this.getProductos
  },
  methods: {
    // listarCategorias();
    ...mapActions('tienda', ['fetchProductos']),
    buscarProductos () {
      this.productos = this.filtrarProductosPorCampo(this.campo)
      // console.log(this.filtrarProductosPorCampo(this.campo))
    }
  },
  computed: {
    // LET CATEGORIAS
    ...mapGetters('tienda', ['getProductos']),
    ...mapGetters('tienda', ['filtrarProductosPorCampo'])
  }

}
</script>

<style>
</style>
