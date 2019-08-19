import Vue from 'vue'
import Vuex from 'vuex'
import sharing from './modules/Sharing'
import account from './modules/Account'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sharing,
    account
  },
  strict: debug,
  plugins: []
})
