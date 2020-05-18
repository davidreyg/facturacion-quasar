<template>
  <!-- <div class="col-3 mt-3">
    <div class="card h-100 text-left">
      <img
        class="w-100"
        :src="product.image"
        alt
      />
      <div class="card-body">
        <h4 class="card-title">
          <router-link :to="{name: 'product', params: {id: product.id}}">{{ product.title }}</router-link>
        </h4>
        <strong>${{ product.price }}</strong>
        <p class="card-text">{{ product.description }}</p>
      </div>
      <div class="px-4 pb-3">
        <button
          class="btn btn-secondary"
          @click="addToCart()"
        >Add to Cart</button>
      </div>
    </div>
  </div> -->
  <div class="q-pa-xs col-3 items-start q-gutter-md">
    <q-card
      class="my-card"
      flat
      bordered
    >
      <div
        v-ripple
        @click="verDetalles(producto.id)"
        class="cursor-pointer relative-position"
      >
        <q-img :src="producto.imagen_url || 'statics/img/default_product_image.png'" />

        <q-card-section>
          <div class="text-overline text-orange-9">{{producto.precio_venta | formatearMoneda}}</div>
          <div
            class="text-h5 q-mt-sm q-mb-xs"
            v-text="producto.nombre"
          >Title</div>
          <div
            class="text-caption text-grey"
            v-text="producto.descripcion"
          ></div>
        </q-card-section>
        <q-dialog
          v-model="open"
          no-backdrop-dismiss
        >
          <q-card style="width: 700px; max-width: 80vw;">

            <q-card-section class="row bg-primary text-white">
              <div class="text-h6">Comprar Producto</div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
              />
            </q-card-section>
            <q-card-section class="col-12 full-width">
              <producto-detalle-card @childToParent="open = false"></producto-detalle-card>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductoDetalleCard from './ProductoDetalleCard'
export default {
  props: ['producto'],
  components: { ProductoDetalleCard },
  data () {
    return {
      open: false
    }
  },
  methods: {
    ...mapActions('tienda', ['verDetallesProducto']),
    verDetalles (idProducto) {
      this.verDetallesProducto(idProducto).then(() => {
        this.open = true
      })
    }
  }

}
</script>

<style>
</style>
