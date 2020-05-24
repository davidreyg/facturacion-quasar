<template>
  <div class="row fit">
    <div class="col-12">
      <q-input
        class="q-mb-md"
        v-model="campo"
        type="text"
        label="Buscar"
        @keyup="buscarProductos(campo)"
      />
    </div>
    <div class="col-3">
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          v-for="(categoria, index) in getCategorias" :key="index"
        >
          <q-item-section v-text="categoria.nombre"></q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col-9">
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
    await this.fetchCategorias()
    this.productos = this.getProductos
  },
  methods: {
    // listarCategorias();
    ...mapActions('tienda', ['fetchProductos']),
    ...mapActions('tienda', ['fetchCategorias']),
    buscarProductos (campo) {
      this.productos = this.filtrarProductosPorCampo(campo)
      // console.log(this.filtrarProductosPorCampo(this.campo))
    }
  },
  computed: {
    // LET CATEGORIAS
    ...mapGetters('tienda', ['getProductos']),
    ...mapGetters('tienda', ['getCategorias']),
    ...mapGetters('tienda', ['filtrarProductosPorCampo'])
  }

}
</script>

<style>
</style>
