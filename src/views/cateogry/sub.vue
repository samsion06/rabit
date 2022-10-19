<!--二级类目展示页面-->
<template>
  <div class='sub-category'>
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!--筛选区域-->
      <SubFilter @filter-change="changeFilter" />
      <!--复选框 父子组件双向绑定：父组件实时操控子组件 usecore也有一种-->
      <!-- <XtxCheckbox v-model="isChecked" /> -->
      <!-- ischeck:?{{isChecked}} -->
      <!--排序区域-->
      <SubSort @sort-change="changeSort" />
      <!-- 列表 -->
      <div class="goods-list">
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item" />
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
  import SubFilter from './components/sub-filter'
  import GoodsItem from './components/goods-item.vue'
  import { ref, watch } from 'vue'
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

      //获取商品数据
      function getData() {
        console.log('asdaskjdl');
        //请求开始
        loading.value = true
        reqParams.categoryId = route.params.id
        categoryApi.findSubCategoryGoods(reqParams).then(({ result }) => {
          console.log("result", result);
          if (result.items.length) {
            goodsList.value.push(...result.items)
            reqParams.page++
          } else {
            // 加载完毕 当返回list的数据length为0，证明加载完所有数据，改变标识
            finished.value = true
          }
          // 请求结束
          loading.value = false
        })
      }

      // 切换二级分类重新加载
      //进入http://localhost:8080/#/category/sub/1007000 页面后监听id变化重新拉去最新数据
      watch(() => route.params.id, (newVal) => {
        if (newVal && route.path === ('/category/sub/' + newVal)) {
          goodsList.value = []
          reqParams = {
            page: 1,
            pageSize: 20
          }
          finished.value = false
        }
      })

      // 监听筛选区改变
      const changeFilter = (filterParams) => {
        reqParams = { ...reqParams, ...filterParams }
        reqParams.page = 1
        goodsList.value = []
        // 这里为啥不用调用getdata? getData()
        finished.value = false
      }
      // 监听排序改变
      const changeSort = (sortParams) => {
        reqParams = { ...reqParams, ...sortParams }
        reqParams.page = 1
        goodsList.value = []
        finished.value = false
      }



      return {
        isChecked,
        loading,
        finished,
        getData,
        goodsList,
        changeSort,
        changeFilter

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
