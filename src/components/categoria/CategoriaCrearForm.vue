<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Nueva Categoria</div>
      <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
    </q-card-section>

    <q-separator />
    <q-card-section class="collumn col-12 full-width">

      <ValidationObserver
        ref="observer"
        v-slot="{ passes, invalid}"
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
                  v-model="categoria.nombre"
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
                  v-model="categoria.descripcion"
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
                  :color="invalid ? 'grey' : 'primary'"
                  label="Crear"
                  @click.prevent="passes(crearCategorias)"
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
        <!-- <q-banner v-show="dirty"  class="text-white bg-red">
                    <div v-for="(error, index) in errors" :key="index">
                        <div>{{ error[0] }}</div>
                    </div>
                                    <slot #avatar>
                    <q-icon name="error" color="white" />
                </slot>
                </q-banner> -->

      </ValidationObserver>
    </q-card-section>
  </q-card>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions } from 'vuex'

export default {
  name: 'CategoriaCrearForm',
  components: { ValidationObserver },
  data () {
    return {
      categoria: {
        nombre: '',
        descripcion: ''
      }
    }
  },
  methods: {
    ...mapActions('categoria', {
      cerrarModal: 'openModalCrear'
    }),
    ...mapActions('categoria', ['storeCategoria']),
    crearCategorias () {
      return this.storeCategoria(this.categoria)
      // alert('asd');
    }
  }
}
</script>
