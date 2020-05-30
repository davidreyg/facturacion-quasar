<template>
  <ValidationObserver ref="observer">

    <form @submit.prevent="crearProducto">
      <!-- <div
        class="row"
        v-show="failed"
      >
        <div class="col-12">
          <q-banner
            inline-actions
            class="text-white bg-red"
          >
            <q-list>
              <q-item
                dense
                v-ripple
                v-for="(error,index) in Object.values(errors).flat()"
                :key="index"
              >
                <q-item-section>{{error}}</q-item-section>
              </q-item>
            </q-list>
          </q-banner>
        </div>
      </div> -->
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
              use-input
              :options="categoriaOptions"
              :error="invalid && validated"
              :error-message="errors[0]"
              option-label="nombre"
              option-value="id"
              emit-value
              map-options
              clearable
              @filter="filterFn"
            > <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No hay resultados
                  </q-item-section>
                </q-item>
              </template></q-select>
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
              color="primary"
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
      },
      categoriaOptions: this.categorias
    }
  },
  methods: {
    ...mapActions('producto', {
      cerrarModal: 'openModalCrear',
      storeProducto: 'storeProducto'
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
    async crearProducto () {
      const isValid = await this.$refs.observer.validate()
      if (isValid) {
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
        return this.storeProducto(formData).then(() => {
          this.$q.notify({
            type: 'positive',
            position: 'top-right',
            message: 'Producto creado correctamente.'
          })
        })
      } else {
        this.$q.notify({
          type: 'negative',
          position: 'top-right',
          message: 'Por favor rellene los campos obligatorios.'
        })
      }
    },
    calcularGanancia () {
      this.producto.ganancia = `S/ ${(this.$parseCurrency(this.producto.precio_compra) - this.$parseCurrency(this.producto.precio_venta)) / 100}`
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.categoriaOptions = this.categorias

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        // console.log(this.categorias)
        // this.options = this.getCategorias.filter(v => v.toLowerCase().indexOf(needle) > -1)
        this.categoriaOptions = this.categorias.filter(categoria =>
          Object.keys(categoria).some(
            valor => categoria[valor].toString().toLowerCase().includes(needle)))
      })
    }

  },
  computed: {
    ...mapGetters('categoria', { categorias: 'getCategorias' })
  }
}
</script>
