<template>
  <div class="member-home">
    个人中心
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" />
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem v-for="i in 4" :key="i" :goods="goods" />
    </HomePanel>
    <!-- 猜你 -->
    <GoodsRelevant />

  </div>
</template>
<script>
  import HomeOverview from './components/home-overview'
  import HomePanel from './components/home-panel'
  import GoodsRelevant from '@/views/goods/components/goods-relevant'
  import GoodsItem from '@/views/cateogry/components/goods-item'
  import { findCollect } from '@/api/member'
  import { ref } from 'vue'
  export default {
    name: 'MemberHome',
    components: {
      HomeOverview,
      HomePanel,
      GoodsRelevant,
      GoodsItem
    },
    setup() {
      // 调用模拟的接口
      const collectGoods = ref([])
      findCollect({
        page: 1,
        pageSize: 4
      }).then(data => {
        collectGoods.value = data.result.items
        console.log("collectGoods.value", collectGoods.value);
      })
      return { collectGoods }
    }
  }
</script>
<style scoped lang="less">
  .member-home {}
</style>
