<template>
  <q-drawer
    v-model="rightDrawer"
    side="right"
    elevated
    content-class="bg-grey-3"
  >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>
            Inbox
          </q-item-section>
        </q-item>

        <q-item
          active
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section>
            Star
          </q-item-section>
        </q-item>

        <q-item
          @click="refresh"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>

        <q-item
          v-if="$auth.check()"
          clickable
          @click="logout"
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>

          <q-item-section>
            Logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    <q-img
      class="absolute-top"
      :src="require('../assets/material.png')"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar
          size="56px"
          class="q-mb-sm"
        >
          <img :src="require('../assets/boy-avatar.png')" />
        </q-avatar>
        <div class="text-weight-bold">
          Bienvenido {{ this.$auth.user().username }}
        </div>
        <div></div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppLeftDrawer',
  data () {
    return {
      miniState: false
    }
  },
  methods: {
    logout () {
      this.$auth.logout({
        makeRequest: true,
        redirect: '/auth/login'
        // etc...
      })
    },
    refresh () {
      this.$auth.refresh()
    }
  },
  computed: {
    ...mapState(['rightDrawer'])
  }
}
</script>

<style></style>
