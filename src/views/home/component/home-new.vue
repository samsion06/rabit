<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right>
      <XtxMore />
    </template>
    <div style="position: relative;height: 420px;">
      <Transition name="fade">
        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" alt="">
              <p class="name">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton bg="#f0f9f4" v-else />
      </Transition>
    </div>
  </HomePanel>
</template>
<script>
  import { ref } from 'vue'
  import HomePanel from './home-pannel'
  import HomeSkeleton from '@/components/home-skeleton.vue'
  import findNewApi from '@/api/home'
  export default {
    name: 'HomeNew',
    components: { HomePanel, HomeSkeleton },
    setup() {
      const goods = ref([])
      findNewApi.findNew().then(data => {
        goods.value = data.result
      })
      return { goods }
    }
  }
</script>
<style scoped lang="less">
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
      width: 306px;
      height: 420px;
      background: #f0f9f4;
      .hoverShadow();

      img {
        width: 306px;
        height: 306px;
      }

      p {
        font-size: 22px;
        padding: 12px 30px 0 30px;
        text-align: center;
      }

      .price {
        color: @priceColor;
      }
    }
  }
</style>
