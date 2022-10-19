<template>
  <div class="goods-image">
    <!--大图-->
    <div class="large" v-show="show" :style="[{backgroundImage:`url(${images[currIndex]})`},bgPosition]"></div>
    <div class="middle">
      <img :src="images[currIndex]" alt="">
      <div class="layer"></div>
      <!--遮罩-->
    </div>
    <ul class="small">
      <li v-for="(img,i) in images" :key="img" :class="{active:i===currIndex}">
        <img @mouseenter="currIndex=i" :src="img" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
  import { ref } from 'vue'
  export default {
    name: 'GoodsImage',
    props: {
      images: {
        type: Array,
        default: () => []
      }
    },
    setup(props) {
      const currIndex = ref(0)
      const show = ref(false)
      return { currIndex, show }
    }
  }
</script>
<style scoped lang="less">
  .goods-image {
    width: 480px;
    height: 400px;
    position: relative;
    display: flex;
    z-index: 500;

    .large {
      position: absolute;
      top: 0;
      left: 412px;
      width: 400px; //图片尺寸
      height: 400px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      background-repeat: no-repeat;
      background-size: 800px 800px; //放大效果
      background-color: #f8f8f8;
    }

    .middle {
      width: 400px;
      height: 400px;
      background: #f5f5f5;
      position: relative;
      cursor: move;

      .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, .2);
        left: 0;
        top: 0;
        position: absolute;
      }
    }

    .small {
      width: 80px;

      li {
        width: 68px;
        height: 68px;
        margin-left: 12px;
        margin-bottom: 15px;
        cursor: pointer;

        &:hover,
        &.active {
          border: 2px solid @xtxColor;
        }
      }
    }
  }
</style>
