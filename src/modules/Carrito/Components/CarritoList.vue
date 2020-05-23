<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-12">asd</div>
      <div class="col-12">
        <div v-if="itemListaCarrito.length>0">
          <q-markup-table
            separator="none"
            flat
            bordered
          >
            <thead>
              <tr>

                <th class="text-left">Producto</th>
                <th class="text-right">P. Unitario</th>
                <th class="text-right">Cantidad</th>
                <th class="text-right">T. Unitario</th>
                <th class="text-right">Eliminar</th>
              </tr>
            </thead>
            <tbody
              v-for="(itemCarrito, index) in itemListaCarrito"
              :key="index"
            >
              <tr>
                <td class="text-left">
                  <div class="row">
                    <div class="col-7">
                      <q-img
                        :src="itemCarrito.producto.imagen_url"
                        style="height: 100px; max-width: 100px"
                        spinner-color="primary"
                        spinner-size="82px"
                        native-context-menu
                      >
                        <q-icon
                          class="absolute all-pointer-events"
                          size="16px"
                          name="info"
                          color="black"
                          style="top: 8px; left: 8px"
                        >
                          <q-tooltip>
                            {{itemCarrito.producto.descripcion}}
                          </q-tooltip>
                        </q-icon>
                      </q-img>

                    </div>
                    <div class="col-5 self-center">
                      <span class="text-center text-h5">{{itemCarrito.producto.nombre}}</span>
                      <q-separator />
                      <span class="text-center text-weight-light text-subtitle1">{{itemCarrito.producto.descripcion}}</span>
                    </div>
                  </div>
                </td>
                <td class="text-right">{{itemCarrito.producto.precio_venta | formatearMoneda}}</td>
                <td
                  class="text-right"
                  v-text="itemCarrito.cantidad"
                >6</td>
                <td class="text-right">{{itemCarrito.totalItem | formatearMoneda}}</td>
                <td class="text-right">
                  <q-btn
                    outline
                    round
                    color="negative"
                    icon="delete"
                    no-caps
                    dense
                    @click="eliminarProductoDelCarrito(index)"
                  />
                </td>
              </tr>
              <q-separator />
            </tbody>
            <tbody flat>
              <tr>
                <td
                  class="text-right"
                  colspan="3"
                >
                  <h5>Total</h5>
                </td>
                <td class="text-right"><span class="text-bold">{{totalCarrito | formatearMoneda}}</span></td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <q-banner
          v-else
          inline-actions
          class="text-white bg-grey"
        >
          Su carrito esta vacio.
          <template v-slot:action>
            <q-btn
              flat
              color="white"
              label="Ir a comprar"
              to="tienda"
            />
          </template>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CarritoList',
  created () {
    console.log(this.itemListaCarrito)
  },
  data () {
    return {
      // separator: 'vertical'
    }
  },
  methods: {
    ...mapActions('carrito', ['eliminarProductoDelCarrito'])
  },
  computed: {
    ...mapGetters('carrito', { itemListaCarrito: 'getCarrito' }),
    ...mapGetters('carrito', { totalCarrito: 'getTotalCarrito' })
  }
}
</script>

<style>
</style>
