import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { findAllCategory } from '@/api/category.js'

//重置样式
import 'normalize.css'
import '@/assets/styles/common.less'

createApp(App).use(store).use(router).mount('#app')
