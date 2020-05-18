<template>
  <div>
    <form @submit.prevent="añadirAlCarrito()">
      <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12">
          <div class="row justify-center items-center">
            <div class="col-12">
              <q-img
                :src="producto.imagen_url"
                spinner-color="primary"
                spinner-size="82px"
              />
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
          <!-- <div class="row justify-center"> -->
          <div class="column items-center">
            <h5
              class="text-weight-bolder text-uppercase"
              v-text="producto.nombre"
            ></h5>
            <span
              v-text="'Descripcion: ' + producto.descripcion"
              class="text-weight-thin"
            ></span>
            <span
              v-text="'Stock: '+ producto.stock"
              class="text-right text-weight-thin"
            ></span>
          </div>
          <!-- </div> -->
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
          <div class="column justify-center items-center">
            <!-- <div class="col-12"> -->
            <div class="text-center text-red">{{ producto.precio_venta | formatearMoneda}}</div>
            <q-input
              v-model="cantidad"
              input-class="text-center"
              type="text"
              placeholder="Ingrese cantidad"
            >
              <template v-slot:prepend>
                <q-icon name="control_point" />
              </template>
            </q-input>
            <!-- </div> -->
            <!-- <div class="col-12"> -->
            <q-btn
              class="full-width q-ma-xs"
              type="submit"
              color="primary"
              label="Añadir al carrito"
              icon="add_shopping_cart"
            />
            <!-- </div> -->
            <!-- <div class="col-12"> -->
            <q-btn
              class="full-width q-ma-xs"
              type="button"
              color="negative"
              label="Cancelar"
              icon="cancel"
              @click="$emit('childToParent')"
            />
            <!-- </div> -->
          </div>
        </div>

      </div>
    </form>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductoDetalleCard',
  data () {
    return {
      cantidad: null
    }
  },
  methods: {
    ...mapActions('carrito', ['añadirProductoAlCarrito']),
    añadirAlCarrito () {
      const total = this.producto.precio_venta * this.cantidad
      console.log(total)
      this.añadirProductoAlCarrito({
        producto: this.producto,
        cantidad: parseInt(this.cantidad)
      })
    }
  },
  computed: {
    ...mapGetters('tienda', { producto: 'getProducto' })
  }

}
</script>

<style>
</style>
