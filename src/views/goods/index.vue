<template>
  <div class='xtx-goods-page' v-if="goods">
    <div class="container">
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- 图片 -->
          <GoodsImg :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec">
          <!--商品名称-->
          <GoodsName :goods="goods" />
          <!--规格区间-->
          <GoodsSku :goods="goods" skuId="300456055" @change="changeSku" />
          <!--数量+- -->
          <XtxNumbox label="数量" v-model:modelValue="num" :min="1" :max="goods.inventory" @change="test" />
          num:{{num}}
          <div
            style="width: 100px; line-height: 50px; background-color: green; text-align: center; color: white; margin-top: 20px;cursor: pointer;"
            @click="insertCart()">加入购物车</div>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTab />
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //组件
  import GoodsRelevant from './components/goods-relevant.vue'
  import GoodsImg from './components/goods-image.vue'
  import GoodsSales from './components/goods-sales.vue'
  import GoodsName from './components/goods-name.vue'
  import GoodsSku from './components/goods-sku.vue'
  import GoodsTab from './components/goods-tabs.vue'
  import GoodsHot from './components/goods-hot'
  //方法
  import { useRoute } from 'vue-router'
  import { ref, reactive, watch, nextTick, provide, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import { ElMessage } from 'element-plus'
  import $product from '@/api/product'
  export default {
    name: 'XtxGoodsPage',
    components: { GoodsRelevant, GoodsImg, GoodsSales, GoodsName, GoodsSku, GoodsTab, GoodsHot },
    //props,context=>emit,和生命周期钩子setup独有
    setup(props, { emit }) {
      function test(num) {
        console.log("asd", num);
      }


      //更换规格后刷新页面数据
      const goods = useGoods() //ref(null)

      function changeSku(sku) { //sku=>{} || {有值的对象}
        console.log("sku", sku);
        if (sku.skuId) {
          goods.value.price = sku.price
          goods.value.oldPrice = sku.oldPrice
          goods.value.inventory = sku.inventory
          //存储更改后的规格对象
          currSku.value = sku
        } else {

        }
      }

      //加入购物车
      const currSku = ref(null) //存储更改后的规格对象(已选规格信息，goods是放所有规格信息)
      const instance = getCurrentInstance()
      const store = useStore()
      //购买商品数量 （双向绑定，为什么要回传到父组件?，用于加入购物车）
      const num = ref(1)

      function insertCart() {
        if (!currSku.value) {
          ElMessage({ message: '请选择商品规格' + currSku.value, status: 'error' })
        } else if (num.value > goods.inventory) {
          ElMessage({ message: '库存不足', status: 'error' })
        } else {
          store.dispatch('cart/insertCart', {
            id: goods.value.id,
            skuId: currSku.value.skuId,
            name: goods.value.name, //用于加入购物车
            picture: goods.value.mainPictures[0],
            price: currSku.value.price,
            nowPrice: currSku.value.price,
            count: num.value,
            attrsText: currSku.value.specsText,
            selected: true,
            isEffective: true,
            stock: currSku.value.inventory
          }).then((res) => {
            ElMessage({ message: res, status: 'success' })
          })
        }
      }

      //父传孙
      provide('goods', goods)


      return {
        goods,
        changeSku,
        num,
        insertCart,
        test
      }
    }
  }
  // 获取商品详情
  const useGoods = () => {
    const goods = ref(null)
    const route = useRoute()
    // 出现路由地址商品ID发生变化，但是不会重新初始化组件
    watch(() => route.params.id, (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        $product.findGoods(route.params.id).then(data => {
          // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
          goods.value = null
          nextTick(() => {
            goods.value = data.result
          })

        })
      }
    }, { immediate: true })
    return goods
  }
</script>

<style scoped lang='less'>
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }
</style>
