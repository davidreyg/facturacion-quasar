import axios from 'axios'
import VueAxios from 'vue-axios'
import { Model } from 'vue-api-query'

export default ({ Vue }) => {
  // something to do
  const httpClient = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: {
      'Content-Type': 'application/json'
      // anything you want to add to the headers
    }
  })
  Model.$http = httpClient
  Vue.use(VueAxios, httpClient)
}
