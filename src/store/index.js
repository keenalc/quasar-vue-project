import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import loan from './loan'

export default store(function () {
  return createStore({
    modules: {
      loan
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

})
