import axios from 'axios'
import VueAxios from 'vue-axios'

export default ({ Vue }) => {
  // something to do
  Vue.use(VueAxios, axios)
}
