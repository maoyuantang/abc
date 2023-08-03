import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局工具
// import CONSTANT from '@/api/constant';
import API from '@/api/url/index'
import util from '@/libs/util'

// 插件
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
// import lodash from 'lodash'
// window._ = lodash

// window
window.API = API
window.util = util

createApp(App).use(store).use(router).use(ViewUIPlus).mount('#app')
