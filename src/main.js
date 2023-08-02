import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 插件
// import lodash from 'lodash'
// window._ = lodash
createApp(App).use(store).use(router).mount('#app')
