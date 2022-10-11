import { createStore } from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'
import category from './modules/category.js'
import createPersistedstate from 'vuex-persistedstate'
export default createStore({
  //每个模块都有独立的state,mutations....
  modules: {
    user,
    cart,
    category
  },
  //配置持久化插件
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store', //命名空间
      paths: ['user', 'cart'] //value =>{key,val}
    })
  ]
})
