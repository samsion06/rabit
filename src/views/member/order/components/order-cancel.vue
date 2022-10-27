<!--取消订单原因对话框-->
<template>
  <Dialog :dialogVisible="dialogVisible">
    <template v-slot:Title>
      <div class="title">取消订单</div>
    </template>
    <template v-slot:Content>
      <div class="reasons" @click="confirm('不想要了')">不想要了</div>
    </template>
  </Dialog>
</template>

<script>
  import { cancelOrder } from '@/api/order'
  import { reactive, ref } from 'vue'
  export default {
    name: 'orderCancel',
    setup() {
      //控制对话框打开关闭
      const dialogVisible = ref(false)
      //存取取消原因
      const curText = ref('')
      //点击取消原因后关闭对话框
      function confirm(reasons) {
        dialogVisible.value = false
        curText.value = reasons
        //请求取消订单接口
        cancelOrder(order.value.id, curText.value).then(() => {
          alert('取消订单成功')
          // 更新订单状态
          order.value.orderState = 6
          // 关闭对话框
          dialogVisible.value = false
        })
      }

      //订单orderId => from index.vue
      const order = ref('')
      //打开取消原因对话框
      function open(item) {
        dialogVisible.value = true
        curText.value = '' //每次打开清空取消原因缓存
        order.value = item
        console.log("order.value", order.value);
      }

      return {
        dialogVisible,
        open,
        confirm
      }
    }
  }
</script>

<style lang="less" scoped>
  .reasons {
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #27BA9B;
    color: #27BA9B;
    margin-top: 100px;
    cursor: pointer;
  }
</style>
