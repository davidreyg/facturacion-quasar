<template>
  <div id="q-app">

    <!-- <transition
      appear
      enter-active-class="animated :v fadeIn"
      leave-active-class="animated fadeOut"
    > -->
    <q-ajax-bar
      position="top"
      size="4px"
      color="red"
      :delay="delay"
    />
    <router-view
      v-on:startAjaxBar="onStartAjaxBar"
      v-on:stopAjaxBar="onStopAjaxBar"
    />
    <!-- </transition> -->
  </div>
</template>

<script >
export default {
  name: 'App',
  data: () => {
    return {
      delay: 0
    }
  },
  methods: {
    onStartAjaxBar () {
      console.log('started')
      this.$refs.bar.start()
    },
    onStopAjaxBar () {
      console.log('stopped')
      this.$refs.bar.stop()
    }
  }
}
</script>
