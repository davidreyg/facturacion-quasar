<template>
  <div>
    <div class="q-pa-md doc-container q-gutter-md">
      <div class="row items-center">
        <div class="col">
          <producto-list></producto-list>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="getModalEditarAbierto"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Actualizar Producto</div>
          <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
        </q-card-section>
        <q-card-section class="col-12 full-width">
          <producto-editar-form></producto-editar-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="getModalCrearAbierto"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">Nuevo Producto</div>
          <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="col-12 full-width">
          <producto-crear-form></producto-crear-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductoEditarForm from '../../components/Producto/ProductoEditarForm'
import ProductoCrearForm from '../../components/Producto/ProductoCrearForm'
import ProductoList from '../../components/Producto/ProductoList'
export default {
  name: 'Producto',
  components: { ProductoList, ProductoCrearForm, ProductoEditarForm },
  async created () {
    await this.fetchCategorias()
  },
  methods: {
    ...mapActions('categoria', ['fetchCategorias'])
  },
  computed: {
    ...mapGetters('producto', ['getModalCrearAbierto']),
    ...mapGetters('producto', ['getModalEditarAbierto'])

  }

}
</script>

<style>
</style>
