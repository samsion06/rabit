import request from '@/utils/request.js'

//热销榜
export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
export const findCommentInfoByGoods = (id) => {
  return request(`/goods/${id}/evaluate`,'get')
}

export const findCommentList = (id,params) => {
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,'get',params)
}
