// import something here
import { ValidationProvider, extend, localize } from 'vee-validate'
import { required, length, min, max } from 'vee-validate/dist/rules'
import es from 'vee-validate/dist/locale/es.json'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ Vue }) => {
  // something to do
  extend('required', required)
  extend('length', length)
  extend('min', min)
  extend('max', max)
  localize('es', es)
  Vue.component('ValidationProvider', ValidationProvider)
}
