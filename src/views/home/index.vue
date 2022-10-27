<!--二级路由区域-->
<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!--轮播图-->
        <HomeBanner />
      </div>
    </div>
  </div>
  <!--新鲜好物品-->
  <HomeNew />
  <!--人气推荐-->
  <HomeHot />
  <!--人气品牌-->
  <HomeBrand />
  <!--商品区域-->
  <HomeProduct />
  <!--最新专题 -->


</template>

<script>
  import HomeCategory from './component/home-category.vue'
  import HomeBanner from './component/home-banner.vue'
  import HomeNew from './component/home-new.vue'
  import HomeHot from './component/home-hot.vue'
  import HomeBrand from './component/home-brand.vue'
  import HomeProduct from './component/home-product.vue'


  //import HomeSpecial from './component/home-speical.vue'
  export default {
    name: 'homepage',
    components: {
      HomeCategory,
      HomeBanner,
      HomeNew,
      HomeHot,
      HomeBrand,
      HomeProduct,

    }
  }
</script>

<style scoped lang="less">

</style>
