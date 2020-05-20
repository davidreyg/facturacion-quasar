<template>
  <div>
    <q-btn
      dense
      flat
      round
      icon="shopping_cart"
      to="carrito"
    >
      <q-badge
        v-if="productosCarrito.length > 0"
        color="red"
        floating
        :label="productosCarrito.length"
      >
      </q-badge>
    </q-btn>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BotonCarritoContador',
  computed: {
    ...mapGetters('carrito', { productosCarrito: 'getCarrito' })
  }

}
</script>

<style>
</style>
