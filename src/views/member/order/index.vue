<template>
  <!--选项卡-->
  <div class="member-order-page">
    <el-tabs v-model="tabSelected" type="card" class="is-active" @tab-click="handleClick">
      <el-tab-pane :label="item.label" :name="item.name" v-for="(item,tabIndex) in tabs" :key="tabIndex">
        <!--列表-->
        <div class="order-list">
          <!--商品数据-->
          <orderItem v-for="item in orderList" :key="item.id" :order="item" v-if="orderList" @on-cancel="hanldeCancel"
            @on-confirm="onConfirmOrder" @on-logisticsOrderCom="onLogisticsOrder">
          </orderItem>
          <!--列表没有数据展示-->
          <!-- <div v-else>暂无数据</div> -->
          <!--分页功能还没实现-->
          <!-- <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small" :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400" @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="float: right;" /> -->
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <orderCancel ref="orderCancel" />
  <OrderLogistics ref="logisticsOrderCom" />
</template>

<script>
  import { reactive, ref, watch } from 'vue'
  import { findOrderList, confirmOrder } from '@/api/order'
  import orderCancel from './components/order-cancel.vue'
  import orderItem from './components/order-item.vue'

  export default {
    name: '我的订单',
    components: {
      orderCancel,
      orderItem,
    },
    setup() {
      //选项卡数据
      const tabs = ref([
        { name: 'all', label: '全部订单' },
        { name: 'unpay', label: '待付款' },
        { name: 'deliver', label: '待发货' },
        { name: 'receive', label: '待收货' },
        { name: 'comment', label: '待评价' },
        { name: 'complete', label: '已完成' },
        { name: 'cancel', label: '已取消' }
      ])

      // 请求参数
      const requestParams = reactive({
        page: 1,
        pageSize: 5,
        orderState: 0
      })

      //切换选项卡渲染
      const tabSelected = ref('all')

      function handleClick(tab, event) {
        requestParams.orderState = tab.index
        requestParams.page = 1
        //控制选项卡切换样式
        tabSelected.value = tab.props.name
      }

      // 订单列表
      //进来先强制拉一次数据，然后请求参数改变后继续拉
      const orderList = ref([]) //存储订单列表
      watch(requestParams, () => {
        findOrderList(requestParams).then(data => {
          orderList.value = data.result.items
          console.log("orderList=>:", orderList.value);
        })
      }, { immediate: true })

      return {
        tabs,
        tabSelected,
        handleClick,
        orderList,
        ...userCanel(), //1.先userCanel()返回一个对象 2.然后...再解构到=>return这个对象里面
        ...useConfirmOrder(),
        ...useLogisticsOrder()
      }
    }
  }
  //取消订单
  const userCanel = () => {
    const orderCancel = ref(null) //其他vue组件实例
    const hanldeCancel = (item) => { //item=>order列表的对象
      //直接叫子组件做事
      orderCancel.value.open(item)
    }
    return { hanldeCancel, orderCancel }
  }

  //确认收货
  const useConfirmOrder = () => {
    const onConfirmOrder = (item) => {
      if (window.confirm('您确认收到货吗？确认后货款将会打给卖家')) {
        confirmOrder(item.id).then(() => {
          alert('确认收货成功')
          item.orderState = 4
        })
      }
    }
    return { onConfirmOrder }
  }

  //查看物流
  // 封装逻辑-查看物流
  const useLogisticsOrder = () => {
    const logisticsOrderCom = ref(null)
    const onLogisticsOrder = (item) => {
      console.log("logisticsOrderCom.value", logisticsOrderCom.value);
      logisticsOrderCom.value.open(item)
    }
    return { onLogisticsOrder, logisticsOrderCom }
  }
</script>

<style lang="less" scoped>
  .member-order-page {

    //订单列表
    .order-list {
      background: #fff;
      padding: 20px;
      overflow: auto;
      height: 1000px;
    }

    .order-item {
      margin-bottom: 20px;
      border: 1px solid #f5f5f5;

      .head {
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        padding: 0 20px;
        overflow: hidden;

        span {
          margin-right: 20px;

          &.down-time {
            margin-right: 0;
            float: right;

            i {
              vertical-align: middle;
              margin-right: 3px;
            }

            b {
              vertical-align: middle;
              font-weight: normal;
            }
          }
        }

        .del {
          margin-right: 0;
          float: right;
          color: #999;
        }
      }

      .body {
        display: flex;
        align-items: stretch;

        .column {
          border-left: 1px solid #f5f5f5;
          text-align: center;
          padding: 20px;

          >p {
            padding-top: 10px;
          }

          &:first-child {
            border-left: none;
          }

          &.goods {
            flex: 1;
            padding: 0;
            align-self: center;

            ul {
              li {
                border-bottom: 1px solid #f5f5f5;
                padding: 10px;
                display: flex;

                &:last-child {
                  border-bottom: none;
                }

                .image {
                  width: 70px;
                  height: 70px;
                  border: 1px solid #f5f5f5;
                }

                .info {
                  width: 220px;
                  text-align: left;
                  padding: 0 10px;

                  p {
                    margin-bottom: 5px;

                    &.name {
                      height: 38px;
                    }

                    &.attr {
                      color: #999;
                      font-size: 12px;

                      span {
                        margin-right: 5px;
                      }
                    }
                  }
                }

                .price {
                  width: 100px;
                }

                .count {
                  width: 80px;
                }
              }
            }
          }

          &.state {
            width: 120px;

            .green {
              color: @xtxColor;
            }
          }

          &.amount {
            width: 200px;

            .red {
              color: @priceColor;
            }
          }

          &.action {
            width: 140px;

            a {
              display: block;

              &:hover {
                color: @xtxColor;
              }
            }
          }
        }
      }
    }


    //tabs选项卡样式调整
    //https://blog.csdn.net/weixin_41346436/article/details/117749810
    //加上scoped后需要用deep进行样式穿透
    /deep/ .el-tabs--card {
      height: 60px;
    }

    /deep/ .el-tabs--card>.el-tabs__header {
      height: 60px;
      background-color: #ffffff;
    }

    /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item {
      line-height: 60px;
      height: 60px;
      width: 110px;
      // border-top: 2px solid #27BA9B ;

    }

    /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item:hover {
      color: #000000;
    }

    /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      border-top: 2px solid #27BA9B;
      color: black;
      line-height: 60px;
      border-bottom: none;
    }

  }
</style>
