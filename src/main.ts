import { createApp } from 'vue'
import router from './router'
import store from './store'
import axios from 'axios'

import App from './App.vue'
axios.defaults.baseURL = 'https://apis.imooc.com/api'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: '55A762704CEDEC3C' }
  if (config.method === 'post') {
    config.data = { ...config.data, icode: '55A762704CEDEC3C' }
  }
  if (config.data instanceof FormData) {
    config.data.append('icode', '55A762704CEDEC3C')
  } else {
  // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: '55A762704CEDEC3C' }
  }
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  setTimeout(() => {
    store.commit('setLoading', false)
  }, 1000)
  return config
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})
// axios.get('/columns').then(resp => {
//   console.log(resp.data)
// })
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
