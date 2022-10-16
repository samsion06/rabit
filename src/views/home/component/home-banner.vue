<template>
  <div class="home-banner">
    <!--要加上这个不然渲染很慢v-if="sliders.length>0-->
    <el-carousel :interval="5000" arrow="always" height="500px" :loop="true" v-if="sliders.length>0">
      <el-carousel-item v-for="item in sliders" :key="item.id">
        <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%;">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import bannerApi from '@/api/home.js'
  import { ref, onMounted, watch } from 'vue'
  export default {
    name: 'home-banner',
    setup() {
      // //轮播图片
      const sliders = ref([])
      bannerApi.findBanner().then(data => {
        sliders.value = data.result
      })
      return { sliders }
    }
  }
</script>

<style>
  .home-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 990px;
    left: 250px;
    height: 500px;
    z-index: 98;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-carousel__button {
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }
</style>
