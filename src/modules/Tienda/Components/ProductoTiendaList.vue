<template>
  <div class="row align-items-center">
    <producto-card v-for="producto in getProductos" :key="producto.id" :producto="producto" />
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
    }
  },
  async created () {
    await this.fetchProductos()
  },
  methods: {
    // listarCategorias();
    ...mapActions('tienda', ['fetchProductos'])
  },
  computed: {
    // LET CATEGORIAS
    ...mapGetters('tienda', ['getProductos'])
  }

}
</script>

<style>

</style>
