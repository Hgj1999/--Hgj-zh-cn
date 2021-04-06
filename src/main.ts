import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'

import App from './App.vue'
axios.defaults.baseURL = 'https://apis.imooc.com/api'
axios.interceptors.request.use(config => {
  if (config.method === 'post') {
    config.data = { ...config.data, icode: '55A762704CEDEC3C' }
  }
  config.params = { ...config.params, icode: '55A762704CEDEC3C' }
  store.commit('setLoading', true)
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
})
// axios.get('/columns').then(resp => {
//   console.log(resp.data)
// })
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
