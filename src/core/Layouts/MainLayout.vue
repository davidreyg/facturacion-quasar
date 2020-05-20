<template>
  <q-layout view="hHh LpR fff">
    <app-header></app-header>
    <app-left-drawer></app-left-drawer>
    <app-right-drawer></app-right-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <app-footer></app-footer>
  </q-layout>
</template>

<script>
import AppRightDrawer from './AppRightDrawer'
import AppLeftDrawer from './AppLeftDrawer'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: { AppHeader, AppLeftDrawer, AppRightDrawer, AppFooter },
  data () {
    return {
      left: false,
      right: false,
      miniState: false
    }
  },
  computed: {
    ...mapState(['leftDrawer'])
  }
}
</script>
