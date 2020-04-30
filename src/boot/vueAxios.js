import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Model } from 'vue-api-query'

/* TODO : ASDASD */
export const baseAxios = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
    // anything you want to add to the headers
  }
})
export default ({ Vue }) => {
  // something to do
  const httpClient = baseAxios
  Model.$http = httpClient
  Vue.use(VueAxios, httpClient)
}

Vue.prototype.$axios = baseAxios
