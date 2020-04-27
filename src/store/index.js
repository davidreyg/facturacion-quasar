import Vue from 'vue'
import Vuex from 'vuex'

import categoria from './categoria'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      categoria
    },
    state: {
      token: localStorage.getItem('token_API_FACTURACION') || sessionStorage.getItem('token_API_FACTURACION'),
      leftDrawer: false,
      rightDrawer: false
    },

    mutations: {
      SET_IS_LOGGED_IN (state, isLoggedIn) {
        state.isLoggedIn = isLoggedIn
      },
      SET_LEFT_DRAWER (state, leftDrawer) {
        state.leftDrawer = leftDrawer
      },
      SET_RIGHT_DRAWER (state, rightDrawer) {
        state.rightDrawer = rightDrawer
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
