<template>

  <ValidationObserver
    ref="observer"
    v-slot="{ passes, invalid }"
  >
    <form @submit.prevent="passes(actualizarProducto)">
      <div class="row">
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="required|min:4 |max:10"
            name="nombre"
            v-slot="{ errors, invalid, validated }"
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
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="min: 4|max: 30"
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
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="required|min:2"
            name="stock"
            v-slot="{ errors, invalid, validated }"
          >
            <q-input
              v-model="stock"
              class="q-mb-md"
              color="blue-grey-10"
              type="text"
              label="Stock"
              :error="invalid && validated"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="required"
            name="precio de compra"
            v-slot="{ errors, invalid, validated }"
          >
            <q-input
              v-model="precio_compra"
              class="q-mb-md"
              color="blue-grey-10"
              type="text"
              label="P. Compra"
              :error="invalid && validated"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="required"
            name="precio de venta"
            v-slot="{ errors, invalid, validated }"
          >
            <q-input
              v-model="precio_venta"
              class="q-mb-md"
              color="blue-grey-10"
              type="text"
              label="P. Venta"
              :error="invalid && validated"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="required"
            name="ganancia"
            v-slot="{ errors, invalid, validated }"
          >
            <q-input
              v-model="ganancia"
              readonly
              class="q-mb-md"
              color="blue-grey-10"
              type="text"
              label="Ganancia"
              :error="invalid && validated"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="required|min: 3"
            name="moneda"
            v-slot="{ errors, invalid, validated }"
          >
            <q-input
              readonly
              v-model="moneda"
              class="q-mb-md"
              color="blue-grey-10"
              type="text"
              label="Moneda"
              :error="invalid && validated"
              :error-message="errors[0]"
            />
          </ValidationProvider>
        </div>
        <div class="col col-6 q-px-xs ">
          <ValidationProvider
            rules="required"
            name="categoria"
            v-slot="{ errors, invalid, validated }"
          >
            <q-select
              v-model="categoria_id"
              class="q-mb-md"
              color="blue-grey-10"
              label="Categoria (*)"
              :options="categoriaOptions"
              :error="invalid && validated"
              :error-message="errors[0]"
              option-value="categoria_id"
              emit-value
              map-options
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
              v-model="imagen"
              class="q-mb-md"
              color="blue-grey-10"
              label="Imagen (*)"
              :error="invalid && validated"
              :error-message="errors[0]"
              @input="mostrarPreImagen"
              clearable
              counter
            />
            <q-img
              :src="avatar"
              :ratio="16/9"
              spinner-color="primary"
              spinner-size="82px"
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
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import { mapActions, mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: 'producto/getProductoField',
  mutationType: 'producto/updateProductoField'
})

// const reader2 = new FileReader()
export default {
  name: 'ProductoEditarForm',
  components: { ValidationObserver },
  data () {
    return {
      avatar: null
    }
  },
  created () {
    // this.producto.ganancia = `S/ ${this.producto.ganancia / 100}`}
    this.avatar = this.producto.imagen_url
  },
  methods: {
    ...mapActions('producto', {
      cerrarModal: 'openModalEditar'
    }),
    ...mapActions('producto', ['updateProducto']),
    actualizarProducto () {
      this.$parseCurrency(this.producto.precio_compra)
      this.$parseCurrency(this.producto.precio_venta)
      this.$parseCurrency(this.producto.ganancia)
      const formData = new FormData()
      formData.append('id', this.producto.id)
      formData.append('nombre', this.producto.nombre)
      formData.append('descripcion', this.producto.descripcion)
      formData.append('stock', this.producto.stock)
      formData.append('precio_compra', this.producto.precio_compra)
      formData.append('precio_venta', this.producto.precio_venta)
      formData.append('ganancia', this.producto.ganancia)
      formData.append('moneda', this.producto.moneda)
      formData.append('categoria_id', this.producto.categoria_id)
      formData.append('imagen', this.producto.imagen)
      formData.append('_method', 'PUT')

      return this.updateProducto(formData)
      // alert('asd');
    },
    calcularGanancia () {
      // this.producto.ganancia = `S/ ${(this.$parseCurrency(this.producto.precio_compra) - this.$parseCurrency(this.producto.precio_venta)) / 100}`
    },
    mostrarPreImagen (e) {
      this.avatar = null
      if (e) {
        const reader = new FileReader()
        reader.readAsDataURL(e)
        reader.onload = e => {
          this.avatar = e.target.result
        }
      }
    }
  },
  computed: {
    ...mapGetters('producto', { producto: 'getProducto' }),
    ...mapGetters('categoria', ['getCategorias']),
    ...mapFields([
      'nombre',
      'descripcion',
      'stock',
      'precio_compra',
      'precio_venta',
      'ganancia',
      'moneda',
      'categoria_id',
      'imagen'
    ]),

    categoriaOptions () {
      // let productoSeleccionado = this.producto;
      let options = {}

      // let self = this;
      return this.getCategorias.map(function (categoria) {
        options = { label: categoria.nombre, categoria_id: categoria.id }
        return options
      })
    }
  }
}
</script>
