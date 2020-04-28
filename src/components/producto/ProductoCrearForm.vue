<template>
  <q-card class="my-card">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Nuevo Producto</div>
      <div class="text-subtitle3">Los campos con (*) son obligatorios</div>
    </q-card-section>

    <q-separator />
    <q-card-section class="collumn col-12 full-width">
      <ValidationObserver
        ref="observer"
        v-slot="{ passes, invalid }"
      >
        <q-form>
          <div class="row">
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:4 |max:10"
                name="nombre"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="producto.nombre"
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="Nombre (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="min: 4|max: 30"
                name="descripcion"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="producto.descripcion"
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="Descripcion"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required"
                name="stock"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="producto.stock"
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="Stock (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:1"
                name="precio de compra"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="producto.precio_compra"
                  @change="calcularGanancia"
                  v-currency
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="P. Compra (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:1"
                name="precio de venta"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="producto.precio_venta"
                  @change="calcularGanancia"
                  v-currency
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="P. Venta (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|min:1"
                name="ganancia"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="producto.ganancia"
                  readonly
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="Ganancia (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required|max:3"
                name="moneda"
                v-slot="{ errors, invalid, validated }"
              >
                <q-input
                  v-model="producto.moneda"
                  class="q-mb-md"
                  color="blue-grey-10"
                  type="text"
                  label="Moneda (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required"
                name="imagen"
                v-slot="{ errors, invalid, validated }"
              >
                <q-file
                  v-model="producto.imagen"
                  class="q-mb-md"
                  color="blue-grey-10"
                  label="Imagen (*)"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                />
                <!-- <q-uploader
                  url=""
                  extensions=".gif,.jpg,.jpeg,.png"
                  @added="file_selected"
                /> -->
                {{producto.imagen}}
              </ValidationProvider>
            </div>
            <div class="col col-6 q-px-xs ">
              <ValidationProvider
                rules="required"
                name="categoria"
                v-slot="{ errors, invalid, validated }"
              >
                <q-select
                  v-model="producto.categoria_id"
                  class="q-mb-md"
                  color="blue-grey-10"
                  label="Categoria (*)"
                  :options="categoriaOptions"
                  :error="invalid && validated"
                  :error-message="errors[0]"
                  emit-value
                  map-options
                />
              </ValidationProvider>
            </div>
            <pre>{{producto}}</pre>
            <div class="row justify-center items-center fit q-gutter-md">
              <div class="col-5">
                <q-btn
                  class="q-mt-md full-width"
                  type="submit"
                  :color="invalid ? 'grey' : 'primary'"
                  label="Crear"
                  @click.prevent="crearProducto"
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
        </q-form>
      </ValidationObserver>
    </q-card-section>
  </q-card>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProductoCrearForm',
  components: { ValidationObserver },
  data () {
    return {
      producto: {
        nombre: '',
        descripcion: '',
        stock: '',
        precio_compra: '',
        precio_venta: '',
        ganancia: '',
        moneda: '',
        categoria_id: '',
        imagen: null
      }
    }
  },
  methods: {
    ...mapActions('producto', {
      cerrarModal: 'openModalCrear'
    }),
    ...mapActions('producto', ['storeProducto']),
    crearProducto (evt) {
      this.producto.precio_compra = this.$parseCurrency(this.producto.precio_compra)
      this.producto.precio_venta = this.$parseCurrency(this.producto.precio_venta)
      this.producto.ganancia = this.$parseCurrency(this.producto.ganancia)
      // console.log(evt)
      // const formData = new FormData(this.producto)
      // const submitResult = []

      // for (const [name, value] of formData.entries()) {
      //   if (value.name.length > 0) {
      //     submitResult.push({
      //       name,
      //       value: value.name
      //     })
      //   }
      // }
      // console.log(submitResult)
      // return this.storeProducto(this.producto)}
      const formData = new FormData()
      formData.append('nombre', this.producto.nombre)
      this.$axios.post(process.env.BASE_API_URL + '/productos', formData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        })
    },
    calcularGanancia () {
      this.producto.ganancia = `S/ ${(this.$parseCurrency(this.producto.precio_compra) - this.$parseCurrency(this.producto.precio_venta)) / 100}`
    }

  },
  computed: {
    ...mapGetters('categoria', ['getCategorias']),
    categoriaOptions () {
      return this.getCategorias.map((categoria) => ({
        label: categoria.nombre,
        value: categoria.id
      }))
    }
  }
}
</script>
