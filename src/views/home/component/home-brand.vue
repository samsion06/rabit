<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证" ref="target">
    <template #right>
      <a href="javascript:;" :class="{disabled:index<=0}" class="iconfont icon-angle-left prev" @click="toggle(-1)"></a>
      <a href="javascript:;" :class="{disabled:index>=page.pageNum-1}" class="iconfont icon-angle-right next"
        @click="toggle(1)"></a>
    </template>
    <div class="box" ref="box">
      <ul class="list" v-if="brands.length" :style="{transform:`translateX(${-index*1240}px)`}">
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.logo">
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>
<script>
  import HomePanel from './home-pannel'
  import brandApi from '@/api/brand.js'
  import { reactive, ref } from 'vue'
  import { useLazyData } from '@/hooks/hooks.js'
  export default {
    name: 'HomeBrand',
    components: { HomePanel },
    setup() {
      // 获取数据
      // const brands = ref([])
      const brandRes = useLazyData(brandApi.findBrand)

      //总共10条 1页面展示5条 2页 (计算总共有多少页)
      const page = reactive({
        pageNum: 0,
        pageSize: 5,
        pageTotal: 10,
      })
      page.pageNum = page.pageTotal / page.pageSize

      // 切换效果，前提只有 0 1 两页
      const index = ref(0)
      // 1. 点击上一页
      // 2. 点击下一页
      function toggle(step) {
        index.value += step
        //还有一种直接在页面禁用 （pointer-event :none）
        if (index.value < 0) {
          index.value = 0
        } else if (index.value > page.pageNum - 1) {
          index.value += -1
        }
        console.log(index.value);
      }
      return {
        brands: brandRes.result,
        target: brandRes.target,
        toggle,
        index,
        page,

      }
    }
  }
</script>

<style scoped lang='less'>
  .home-panel {
    background: #f5f5f5
  }

  .iconfont {
    width: 20px;
    height: 20px;
    background: #ccc;
    color: #fff;
    display: inline-block;
    text-align: center;
    margin-left: 5px;
    background: @xtxColor;

    &::before {
      font-size: 12px;
      position: relative;
      top: -2px
    }

    &.disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    &.disabledE {
      pointer-events: none;
    }
  }

  .box {
    display: flex;
    width: 100%;
    height: 345px;
    overflow: hidden;
    padding-bottom: 40px;

    .list {
      width: 200%;
      display: flex;
      transition: all 1s;

      li {
        margin-right: 10px;
        width: 240px;

        &:nth-child(5n) {
          margin-right: 0;
        }

        img {
          width: 240px;
          height: 305px;
        }
      }
    }
  }
</style>
