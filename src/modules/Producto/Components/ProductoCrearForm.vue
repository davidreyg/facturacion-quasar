<template>
  <ValidationObserver
    ref="observer"
    v-slot="{ passes, invalid }"
  >
    <form @submit.prevent="crearProducto">
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
              @input="mostrarPreImagen"
              counter
              clearable
            />
            <q-img
              :src="producto.avatar"
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
              :color="invalid ? 'grey' : 'primary'"
              label="Crear"
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
        imagen: null,
        avatar: null
      }
    }
  },
  methods: {
    ...mapActions('producto', {
      cerrarModal: 'openModalCrear'
    }),
    mostrarPreImagen (e) {
      this.producto.avatar = null
      if (e) {
        const reader = new FileReader()
        reader.readAsDataURL(e)
        reader.onload = e => {
          this.producto.avatar = e.target.result
        }
      }
    },
    ...mapActions('producto', ['storeProducto']),
    crearProducto () {
      this.producto.precio_compra = this.$parseCurrency(this.producto.precio_compra)
      this.producto.precio_venta = this.$parseCurrency(this.producto.precio_venta)
      this.producto.ganancia = this.$parseCurrency(this.producto.ganancia)

      const formData = new FormData()
      formData.append('nombre', this.producto.nombre)
      formData.append('descripcion', this.producto.descripcion)
      formData.append('stock', this.producto.stock)
      formData.append('precio_compra', this.producto.precio_compra)
      formData.append('precio_venta', this.producto.precio_venta)
      formData.append('ganancia', this.producto.ganancia)
      formData.append('moneda', this.producto.moneda)
      formData.append('categoria_id', this.producto.categoria_id)
      formData.append('imagen', this.producto.imagen)
      // console.log(this.producto)
      // this.$axios.post(process.env.BASE_API_URL + '/productos', formData)
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.error(err)
      //   })
      return this.storeProducto(formData)
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
