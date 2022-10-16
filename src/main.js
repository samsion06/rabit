import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { findAllCategory } from '@/api/category.js'

//重置样式
import 'normalize.css'
import '@/assets/styles/common.less'
//导入自定义插件库
import ui from '@/components/library/index.js'
//导入elemnt-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store).use(router).use(ui).use(ElementPlus).mount('#app')
