// import something here
import { ValidationProvider } from 'vee-validate'
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({ Vue }) => {
  // something to do
  Vue.component('ValidationProvider', ValidationProvider)
}
