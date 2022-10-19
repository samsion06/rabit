import request from '@/utils/request.js'
//api
export default {
  findGoods(id) {
    return request('/goods', 'get', { id })
  }
}
