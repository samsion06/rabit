import request from '@/utils/request.js'

//api
export default {
  //品牌栏目
  findBrand(limit) {
    return request('/home/brand', 'get', { limit })
  }
}
