import login from './modules/login.js'
import { createStore } from 'vuex'

export default createStore({
  // 分模块
  modules: {
    login
  }
})
