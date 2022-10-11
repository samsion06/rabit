import { topCategory } from '@/api/constants.js'
import categoryApi from '@/api/category.js'

// 分类模块
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合
      list: topCategory.map(item => {
        return { name: item, id: '' } //先给个默认值，异步数据还没拉到的时候，页面v-for能渲染到这2个值
      })
    }
  },
  mutations: {
    setCategoryList(state, categoryList) {
      state.list = categoryList
    },
    //栏目展示/隐藏
    show(state, item) {
      let category = state.list.find((category) => category.id == item.id)
      category.open = true
    },
    hide(state, item) {
      let category = state.list.find((category) => category.id == item.id)
      category.open = false
    }
  },
  actions: {
    //获取分类列表
    async getCategoryList({ commit }) { //这里可以直接结构参数
      const { result } = await categoryApi.findAllCategory()
      //加入分类栏目移进移出标识
      result.forEach((item) => {
        item.open = false
      })
      commit('setCategoryList', result)
    }
  }
}
