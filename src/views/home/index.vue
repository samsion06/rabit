<!--二级路由区域-->
<template>
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
      </div>
    </div>
  </div>
</template>

<script>
  import HomeCategory from './component/home-category.vue'
  export default {
    name: 'homepage',
    components: {
      HomeCategory
    }
  }
</script>

<style scoped lang="less">

</style>
