<!--二级类目展示页面-->
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!--筛选区域-->
      <SubFilter />
      <!--复选框 父子组件双向绑定：父组件实时操控子组件 usecore也有一种-->
      <!-- <XtxCheckbox v-model="isChecked" /> -->
      <!-- ischeck:?{{isChecked}} -->
      <!--排序区域-->
      <SubSort />
      <!-- 列表 -->
      <div class="goods-list">
        <ul>
          <li v-for="i in 20" :key="i">
            <GoodsItem :goods="{}" />
          </li>
        </ul>
      </div>
    </div>
    <!-- 加载 -->
    <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
  </div>
</template>

<script>
  import SubBread from './components/sub-bread'
  import SubSort from './components/sub-sort.vue'
  import SubFilter from './sub-filter'
  import GoodsItem from './components/goods-item.vue'
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import categoryApi from '@/api/category.js'

  export default {
    name: 'SubCategory',
    components: {
      SubBread,
      SubFilter,
      SubSort,
      GoodsItem
    },
    setup() {
      const route = useRoute()
      //复选框
      const isChecked = ref(true)
      //加载状态
      const loading = ref(false)
      const finished = ref(false)

      //商品数据
      const goodsList = ref([])
      // 查询参数
      let reqParams = {
        page: 1,
        pageSize: 20
      }

      function getData() {
        loading.value = true
        reqParams.categoryId = route.params.id
        categoryApi.findSubCategoryGoods(reqParams).then(({ result }) => {
          console.log("result", result);
        })
      }
      return {
        isChecked,
        loading,
        finished,
        getData
      }
    }
  }
</script>

<style scoped lang='less'>
  .goods-list {
    background: #fff;
    padding: 0 25px;
    margin-top: 25px;

    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 5px;

      li {
        margin-right: 20px;
        margin-bottom: 20px;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }
</style>
