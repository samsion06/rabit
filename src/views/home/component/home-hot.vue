<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div style="position: relative;height: 426px;" ref="target">
      <Transition name="fade">
        <!--asssetss/common.css里面的fade样式-->
        <ul v-if="goods.length" ref="pannel" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="">
              <p class="name">{{item.title}}</p>
              <p class="desc">{{item.alt}}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
  import { ref } from 'vue'
  import HomePanel from './home-pannel'
  import homeApi from '@/api/home'
  import { useLazyData } from '@/hooks/hooks.js'
  import HomeSkeleton from '@/components/home-skeleton.vue'
  export default {
    name: 'HomeNew',
    components: { HomePanel, HomeSkeleton },
    setup() {
      //组件懒加载
      const hotRes = useLazyData(homeApi.findHot) //element,
      return {
        goods: hotRes.result,
        target: hotRes.target
      }
    }
  }
</script>

<style scoped lang='less'>
  .goods-list {
    display: flex;
    justify-content: space-between;
    height: 426px;

    li {
      width: 306px;
      height: 406px;
      .hoverShadow();

      img {
        width: 306px;
        height: 306px;
      }

      p {
        font-size: 22px;
        padding-top: 12px;
        text-align: center;
      }

      .desc {
        color: #999;
        font-size: 18px;
      }
    }
  }
</style>
