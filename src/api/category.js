import request from '@/utils/request.js'

//api
export default {
  //一二分类蓝栏目
  findAllCategory: function() {
    return request('/home/category/head', 'get')
  },
  //一级分类页面数据
  findTopCategory: function(id) {
    return request('/category', 'get', { id })
  },
  //筛选区域数据
  findSubCategoryFilter: function(id) {
    return request('/category/sub/filter', 'get', { id })
  },
  //二级分类商品数
  findSubCategoryGoods(params) {
    return request('/category/goods/temporary', 'post', params)
  }
}
