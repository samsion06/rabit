<template>
  <div class="cart">
    <table>
      <thead>
        <!--标题-->
        <tr>
          <th width="120">
            <XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox>
          </th>
          <th width="400">商品信息</th>
          <th width="220">单价</th>
          <th width="180">数量</th>
          <th width="180">小计</th>
          <th width="140">操作</th>
        </tr>
      </thead>
      <!-- 有效商品 -->
      <tbody>
        <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
          <!--
          商品前面的复选框
          $event=>checkOne(item.skuId,$event)"
          $event接受子组件emit传过来的值,
          item.skuId接受页面渲染传过来的值
          @change="$event=>checkOne(item.skuId,$event)"
          -->
          <td>
            <XtxCheckbox :modelValue="isSelect" />
            <!--item.selected-->
            select?{{isSelect}}
          </td>
          <td>
            <div class="goods">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
              </RouterLink>
              <div>
                <p class="name ellipsis">{{item.name}}</p>
                <!-- 选择规格组件 -->
                <p class="attr">{{item.attrsText}}</p>
              </div>
            </div>
          </td>
          <td class="tc">
            <p>&yen;{{item.nowPrice}}</p>
            <p v-if="item.price-item.nowPrice>0">
              比加入时降价
              <span class="red">&yen;{{item.price-item.nowPrice}}</span>
            </p>
          </td>
          <td class="tc">
            <XtxNumbox :modelValue="item.count" />
          </td>
          <td class="tc">
            <p class="f16 red">&yen;{{item.nowPrice*100*item.count/100}}</p>
          </td>
          <td class="tc">
            <p><a href="javascript:;">移入收藏夹</a></p>
            <p><a class="green" href="javascript:;">删除</a></p>
            <p><a href="javascript:;">找相似</a></p>
          </td>
        </tr>
      </tbody>
      <!-- 无效商品 -->
      <tbody v-if="$store.getters['cart/invalidList'].length>0">
        <tr>
          <td colspan="6">
            <h3 class="tit">失效商品</h3>
          </td>
        </tr>
        <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
          <td>
            <XtxCheckbox style="color:#eee;" />
          </td>
          <td>
            <div class="goods">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="">
              </RouterLink>
              <div>
                <p class="name ellipsis">{{item.name}}</p>
                <p class="attr">{{item.attrsText}}</p>
              </div>
            </div>
          </td>
          <td class="tc">
            <p>&yen;{{item.nowPrice}}</p>
          </td>
          <td class="tc">{{item.count}}</td>
          <td class="tc">
            <p>&yen;{{item.nowPrice*100*item.count/100}}</p>
          </td>
          <td class="tc">
            <p><a class="green" href="javascript:;">删除</a></p>
            <p><a href="javascript:;">找相似</a></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 操作栏 -->
  <div class="action">
    <div class="batch">
      <XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']">全选</XtxCheckbox>
      <a href="javascript:;">删除商品</a>
      <a href="javascript:;">移入收藏夹</a>
      <a href="javascript:;">清空失效商品</a>
    </div>
    <div class="total">
      共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedTotal']}} 件，商品合计：
      <span class="red">¥{{$store.getters['cart/selectedAmount']}}</span>
      <XtxButton type="primary">下单结算</XtxButton>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  export default {
    name: 'XtxCartPage',
    components: {},
    setup() {
      const isSelect = ref(false)

      const store = useStore()
      // 单选
      const checkOne = (skuId, selected) => {
        console.log("selected", selected);
        return
        store.dispatch('cart/updateCart', { skuId, selected })
      }

      return {
        checkOne,
        isSelect
      }
    }
  }
</script>

<style scoped lang="less">
  .cart {
    margin: 0 auto;
    width: 1140px;
  }

  .tc {
    text-align: center;

    .xtx-numbox {
      margin: 0 auto;
      width: 120px;
    }
  }

  .red {
    color: @priceColor;
  }

  .green {
    color: @xtxColor
  }

  .f16 {
    font-size: 16px;
  }

  .goods {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 100px;
    }

    >div {
      width: 280px;
      font-size: 16px;
      padding-left: 10px;

      .attr {
        font-size: 14px;
        color: #999;
      }
    }
  }

  .action {
    display: flex;
    background: #fff;
    margin-top: 20px;
    height: 80px;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
    padding: 0 30px;

    .xtx-checkbox {
      color: #999;
    }

    .batch {
      a {
        margin-left: 20px;
      }
    }

    .red {
      font-size: 18px;
      margin-right: 20px;
      font-weight: bold;
    }
  }

  .tit {
    color: #666;
    font-size: 16px;
    font-weight: normal;
    line-height: 50px;
  }

  .xtx-cart-page {
    .cart {
      background: #fff;
      color: #666;

      table {
        border-spacing: 0;
        border-collapse: collapse;
        line-height: 24px;

        th,
        td {
          padding: 10px;
          border-bottom: 1px solid #f5f5f5;

          &:first-child {
            text-align: left;
            padding-left: 30px;
            color: #999;
          }
        }

        th {
          font-size: 16px;
          font-weight: normal;
          line-height: 50px;
        }
      }
    }
  }
</style>
