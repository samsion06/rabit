<!--收货地址-->
<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li><span>收<i />货<i />人：</span>{{showAddress.receiver}}</li>
        <li><span>联系方式：</span>{{showAddress.contact}}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a v-if="showAddress" href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>
</template>
<script>
  import { ref } from 'vue'
  export default {
    name: 'CheckoutAddress',
    props: {
      userAddress: {
        type: Array,
      }
    },
    setup(props) {
      // 显示的地址
      const showAddress = ref(null)
      console.log("props.userAddress", props.userAddress);
      if (props.userAddress.length) {
        //在传过来的地址列表中找到default=1的默认地址
        const defaultAddress = props.userAddress.find(item => item.isDefault === 1)
        if (defaultAddress) {
          //有默认地址取默认地址
          showAddress.value = defaultAddress
          console.log(" showAddress.valueaaaaaa", showAddress.value);
        } else {
          // eslint-disable-next-line vue/no-setup-props-destructure
          //没有默认地址取列表第一个地址
          showAddress.value = props.userAddress[0]
          console.log(" showAddress.value", showAddress.value);
        }
      }
      return { showAddress }
    }
  }
</script>
<style scoped lang="less">
  .checkout-address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
      flex: 1;
      min-height: 90px;
      display: flex;
      align-items: center;

      .none {
        line-height: 90px;
        color: #999;
        text-align: center;
        width: 100%;
      }

      >ul {
        flex: 1;
        padding: 20px;

        li {
          line-height: 30px;

          span {
            color: #999;
            margin-right: 5px;

            >i {
              width: 0.5em;
              display: inline-block;
            }
          }
        }
      }

      >a {
        color: @xtxColor;
        width: 160px;
        text-align: center;
        height: 90px;
        line-height: 90px;
        border-right: 1px solid #f5f5f5;
      }
    }

    .action {
      width: 420px;
      text-align: center;

      .btn {
        width: 140px;
        height: 46px;
        line-height: 44px;
        font-size: 14px;

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }
</style>
