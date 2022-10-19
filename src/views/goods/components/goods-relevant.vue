<!--这块暂时不实现-->
<template>
  <div class='goods-relevant'>
    <Swiper>
      <template #banner></template>
    </Swiper>
  </div>
</template>

<script>
  export default {
    name: 'GoodsRelevant'
  }
</script>

<style scoped lang='less'>
  .goods-relevant {
    background: #fff;
    min-height: 460px;
    margin-top: 20px;

    .el-carousel-item {
      background-color: red;
      height: 200px;
    }

  }
</style>
