// src/boot/axios.js

import { boot } from 'quasar/wrappers'
import axios from 'axios'

// To run locally uncomment this and comment the other one
// const api = axios.create({ baseURL: 'http://localhost:8081/api' })

const api = axios.create({ baseURL: 'https://node-app-connection-test.herokuapp.com/api' })


export default boot(({ app }) => {
  app.config.globalProperties.$api = api

})

export { axios, api }
