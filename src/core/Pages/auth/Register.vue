<template>
  <div class="q-pa-md doc-container">
    <div class="column items-center ">
      <q-card class="my-card">
        <q-card-section class="bg-primary text-white q-pa-xl ">
          <div class="text-h6 vertical-middle absolute-center">Registrarse</div>
        </q-card-section>

        <q-separator />

        <q-card-section align="center">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <q-input
              filled
              v-model="user.name"
              label="Nombre *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingrese su nombre']"
            />
            <q-input
              filled
              v-model="user.username"
              label="Usuario *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingrese su usuario']"
            />
            <q-input
              filled
              v-model="user.email"
              label="Email *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingrese su correo']"
            />

            <q-input
              filled
              type="password"
              v-model="user.password"
              label="Contraseña *"
              lazy-rules
              :rules="[
                                    val => val !== null && val !== '' || 'Porfavor ingresa tu contraseña'
                                    ]"
            />

            <div>
              <q-btn
                class="q-mb-sm"
                label="Submit"
                type="submit"
                color="primary"
                rounded
              />
              <p>Ya eres un usuario nuestro? <router-link to="login">Logueate</router-link>
              </p>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

    </div>

  </div>
</template>

<script>
export default {
  name: 'register',
  data: function () {
    return {
      user: {
        name: '',
        username: '',
        email: '',
        password: ''
      }

    }
  },

  methods: {
    onSubmit () {
      console.log(this.user)
      this.$auth
        .register({
          data: this.user,
          redirect: '/',
          staySignedIn: true,
          autoLogin: true
        })
    },

    onReset () {
      this.user.username = null
      this.user.password = null
      this.accept = false
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 500px
</style>
