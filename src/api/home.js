import request from '@/utils/request.js'
//api
export default {
  //广告
  findBanner() {
    return request('/home/banner', 'get')
  },
  //新鲜好物
  findNew() {
    return request('home/new', 'get')
  },
  //人气推荐
  findHot() {
    return request('home/hot', 'get')
  },
  //商品区域
  findGoods() {
    return request('home/goods', 'get')
  },
  //人气专题
  findSpecial() {
    return request('home/special', 'get')
  }
}
