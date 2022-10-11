import request from '@/utils/request.js'

//api
export default {
  findAllCategory: function() {
    return request('/home/category/head', 'get')
  }
}
