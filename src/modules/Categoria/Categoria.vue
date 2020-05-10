<template>
  <div>
    <div class="q-pa-md doc-container q-gutter-md">
      <div class="row items-center">
        <div class="col">
          <categoria-list></categoria-list>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="getModalEditarAbierto"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pa-none">
          <div class="row wrap">
            <div class="col col-12 items-center q-pa-none">
              <categoria-editar-form></categoria-editar-form>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="getModalCrearAbierto"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pa-none">
          <div class="row wrap">
            <div class="col col-12 items-center q-pa-none">
              <categoria-crear-form></categoria-crear-form>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoriaEditarForm from './Components/CategoriaEditarForm'
import CategoriaCrearForm from './Components/CategoriaCrearForm'
import CategoriaList from './Components/CategoriaList'
export default {
  name: 'Categoria',
  components: { CategoriaList, CategoriaCrearForm, CategoriaEditarForm },
  computed: {
    ...mapGetters('categoria', ['getModalCrearAbierto']),
    ...mapGetters('categoria', ['getModalEditarAbierto'])
  }

}
</script>

<style>
</style>
