// 本地：id skuId name picture price nowPrice count attrsText selected stock isEffective
// 线上：比上面多 isCollect 有用 discount 无用 两项项信息
// 购物车状态
import { mergeLocalCart, findCartList, insertCart } from '@/api/cart'
export default {
  namespaced: true,
  state: () => {
    return {
      list: [] //=>state.list
    }
  },
  // { goods:
  // id: goods.value.id,
  // skuId: currSku.value.skuId,
  // name: goods.value.name, //用于加入购物车
  // picture: goods.value.mainPictures[0],
  // price: currSku.value.price,
  // nowPrice: currSku.value.price,
  // count: num.value,
  // attrsText: currSku.value.specsText,
  // selected: true,
  // isEffective: true,
  // stock: currSku.value.inventory
  //}
  getters: {
    // 有效商品列表
    validList(state) {
      return state.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount(state, getters) {
      return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList(state) {
      return state.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList(state, getters) {
      return getters.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount(state, getters) {
      return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
    },
    // 是否全选 (* 有效商品=选中的商品数=>全选)
    isCheckAll(state, getters) {
      return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
    }
  },

  mutations: {
    //加入购物车
    insertCart(state, goods) {
      const sameIndex = state.list.findIndex(item => item.skuId === goods.skuId)
      //在购物车已经存在这个skuId,拉出来修改数量
      if (sameIndex >= 0) {
        //传进来的数量+购物车本来的数量
        goods.count = state.list[sameIndex].count + goods.count
        //删了以后重新按进去 （这种是修改过后排到最前面）
        state.list.splice(sameIndex, 1)
        console.log("state.list[sameIndex].count");
        //这种是不改变顺序的
        //state.list[sameIndex].count += goods.count
      }
      //没找到直接放入购物车 (最新修改的要排在最前面)
      state.list.unshift(goods)
    },

    //修改购物车商品
    updateCart(state, goods) {
      //找到对应的商品
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        //过滤掉值为空的商品信息
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          //console.log("  updateGoods[key]", updateGoods[key]);
          //console.log(" goods[key]", goods[key]);

          //可以写成这样么？=>if(goods[key] == (null || undefined || '')
          updateGoods[key] = goods[key] //更新商品信息
        }
      }
    },

    //删除购物车商品
    deleteCart(state, skuId) {
      let index = state.list.findIndex(item => item.id == skuId)
      state.list.splice(index, 1)
    },

    // 设置购物车列表
    setCartList(state, list) {
      state.list = list
    }
  },

  actions: {
    //ctx:{commit,dispatch,getters,rootGetters,rootState,state}
    //加入购物车
    insertCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        //判断是否登录了
        if (ctx.rootState.user.profile.token) {
          // 已登录
          insertCart(goods).then(() => {
            //这里添加了以后就存到了服务器那边的购物车了
            return findCartList() //重新拉取一次购物车的所有商品,这里是拉的是接口的findcartlist
          }).then(res => {
            //将接口拉的商品数据重新缓存到本地
            ctx.commit('setCartList', res.result)
            resolve('已经登入的购物车数据缓存到本地')
          })
        } else {
          // 未登录
          //console.log("goods", goods);
          ctx.commit('insertCart', goods)
          resolve('未登录缓存购物车数据到本地缓存')
        }
      })
    },

    //修改购物车商品
    updateCart(ctx, goods) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          ctx.commit('updateCart', goods)
          resolve()
        }
      })
    },

    // 做有效商品的全选&反选
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO

        } else {
          // 本地
          // 1. 获取有效的商品列表，遍历的去调用修改mutations即可
          ctx.getters.validList.forEach(item => {
            ctx.commit('updateCart', { skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },

    // 批量删除选中商品
    batchDeleteCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
        } else {
          // 本地
          // 1. 获取选中商品列表，进行遍历调用deleteCart mutataions函数
          ctx.getters.selectedList.forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },

    // 合并本地购物车
    mergeLocalCart(ctx) {
      return new Promise((resolve, reject) => {
        // 存储token后调用合并API接口函数进行购物合并
        const cartList = ctx.getters.validList.map(({ skuId, selected, count }) => {
          return { skuId, selected, count }
        })
        // 清空本地购物车
        ctx.commit('setCartList', [])
        resolve('success')
      })
    },


    // 获取购物车列表
    findCartList(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 登录 TODO
          findCartList().then(data => {
            console.log("data", data);
            ctx.commit('setCartList', data.result)
            resolve()
          })
        }
      })
    }



  }
}
