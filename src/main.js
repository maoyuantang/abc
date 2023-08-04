import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局工具
// import util from '@/libs/util'
// import CONSTANT from '@/plugins/request/constant'

// 插件
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

// 全局挂载

createApp(App).use(store).use(router).use(ViewUIPlus).mount('#app')
