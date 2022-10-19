<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
  </div>
</template>
<script>
  import { computed } from 'vue'
  export default {
    name: 'GoodsHot',
    props: {
      type: {
        type: Number,
        default: 1
      }
    },
    setup(props) {
      //选择性的东西其实可以拿个对象，不用if
      const titleObj = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
      const title = computed(() => {
        return titleObj[props.type]
      })
      return { title }
    }
  }
</script>

<style lang="less">
  .goods-hot {
    h3 {
      height: 70px;
      background: @helpColor;
      color: #fff;
      font-size: 18px;
      line-height: 70px;
      padding-left: 25px;
      margin-bottom: 10px;
      font-weight: normal;
    }

    ::v-deep .goods-item {
      background: #fff;
      width: 100%;
      margin-bottom: 10px;

      img {
        width: 200px;
        height: 200px;
      }

      p {
        margin: 0 10px;
      }

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }
</style>
