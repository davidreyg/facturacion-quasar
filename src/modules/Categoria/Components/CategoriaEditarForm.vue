<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Actualizar Categoria</div>
      <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="collumn col-12 full-width">
      <ValidationObserver
        ref="observer"
        v-slot="{ passes,invalid}"
      >
        <form>
          <div class="row">
            <div class="col col-12 q-px-xs ">
              <ValidationProvider
                rules="required|min:4 |max:20"
                name="nombre"
                v-slot="{errors,invalid,validated }"
              >
                <q-input
                  v-model="nombre"
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="Nombre (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-12 q-px-xs ">
              <ValidationProvider
                rules="min: 3|max: 100"
                name="descripcion"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="descripcion"
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="Descripcion"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />

              </ValidationProvider>
            </div>
            <div class="row justify-center items-center fit q-gutter-md">
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  type="submit"
                  label="Actualizar"
                  :color="invalid ? 'grey' : 'primary'"
                  @click.prevent="passes(actualizarCategoria)"
                />
              </div>
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  type="button"
                  color="negative"
                  label="Cancelar"
                  @click="cerrarModal(false)"
                />
              </div>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </q-card-section>
  </q-card>
</template>

<script>

import { ValidationObserver } from 'vee-validate'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('categoria')
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'categoria/getCategoriaField',
  mutationType: 'categoria/updateCategoriaField'
})
export default {
  name: 'CategoriaEditarForm',
  components: { ValidationObserver },
  data () {
    return {}
  },
  methods: {
    ...mapActions({
      cerrarModal: 'openModalEditar'
    }),
    ...mapActions({
      updateCategoria: 'updateCategoria'
    }),
    actualizarCategoria () {
      return this.updateCategoria(this.categoria)
    }
  },
  computed: {
    ...mapGetters({ categoria: 'getCategoria' }),
    ...mapFields(['nombre', 'descripcion'])

  }

}
</script>
