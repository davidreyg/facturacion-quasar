<template>
  <q-layout view="hHh LpR fff">
    <q-header
      elevated
      class="bg-primary text-white"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="statics/img/quasar-logo.svg" />
          </q-avatar>
          Comprar productos - Laravel
        </q-toolbar-title>
        <boton-carrito-contador></boton-carrito-contador>
        <q-btn
          dense
          flat
          round
          icon="account_circle"
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-input
                  :value="'Administrador'"
                  type="text"
                  label="Tipo"
                  readonly
                />

              </div>

              <q-separator
                vertical
                inset
                class="q-mx-lg"
              />

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  @click="cerrarSesion"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="q-pa-md">
        <router-view></router-view>
      </div>

    </q-page-container>
  </q-layout>
</template>

<script>
import BotonCarritoContador from './Components/BotonCarritoContador'

export default {
  name: 'Tienda',
  components: { BotonCarritoContador },
  methods: {
    cerrarSesion () {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/auth/login'
        // etc...
      })
    }
  }

}
</script>

<style>
</style>
