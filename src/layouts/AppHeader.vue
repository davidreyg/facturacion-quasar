<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="SET_LEFT_DRAWER(!leftDrawer)"
      />

      <q-toolbar-title>
        <q-avatar>
          <img src="statics/img/quasar-logo.svg" />
        </q-avatar>
        Facturacion con Laravel
      </q-toolbar-title>

      <q-btn dense flat round icon="menu" @click="SET_RIGHT_DRAWER(!rightDrawer)" />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'AppHeader',
  methods: {
    ...mapMutations(['SET_LEFT_DRAWER']),
    ...mapMutations(['SET_RIGHT_DRAWER'])
  },
  computed: {
    ...mapState(['leftDrawer']),
    ...mapState(['rightDrawer'])
  }
}
</script>

<style></style>
