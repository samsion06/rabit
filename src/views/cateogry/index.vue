<!--一级类目展示页面-->
<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <el-breadcrumb separator=">" class="bread">
        <el-breadcrumb-item>
          <router-link to="/">
            首页
          </router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="topCategory">
          {{topCategory.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 轮播图 -->
      <!--     <Swiper /> -->
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul v-if="topCategory&&topCategory.children.length>0">
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture">
              <p>{{item.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!--各个分类的商品-->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{item.name}} -</h3>
          <p class="tag">{{item.desc}}</p>
          <XtxMore />
          <!--查看更多-->
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router'
  import { computed, ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import categoryApi from '@/api/category.js'
  import GoodsItem from './components/goods-item'
  export default {
    name: 'TopCategory',
    components: {
      GoodsItem
    },
    setup() {
      console.log(123);

      const route = useRoute()
      const store = useStore()

      const topCategory = ref({})
      topCategory.value = store.state.category.list.find(item => {
        return item.id === route.params.id
      })

      //获取各子类目下的商品
      const subList = ref([])
      const getSubList = () => {
        categoryApi.findTopCategory(route.params.id).then(data => {
          subList.value = data.result.children
        })
      }

      //切换一级分类栏目才拉数据
      watch(() => route.params.id, (newVal) => {
        if (newVal && `/category/${newVal}` == route.path) {
          getSubList()
        }
      }, { immediate: true })

      // const topCategory = computed(() => {
      //   let cate = {}
      //   const item = store.state.category.list.find(item => {
      //     return item.id === route.params.id
      //   })
      //   if (item) cate = item
      //   return cate
      // })

      return {
        topCategory,
        subList
      }
    }
  }
</script>


<style scoped lang="less">
  .top-category {
    h3 {
      font-size: 28px;
      color: #666;
      font-weight: normal;
      text-align: center;
      line-height: 100px;
    }

    .sub-list {
      margin-top: 20px;
      background-color: #fff;

      ul {
        display: flex;
        padding: 0 32px;
        flex-wrap: wrap;

        li {
          width: 168px;
          height: 160px;

          a {
            text-align: center;
            display: block;
            font-size: 16px;

            img {
              width: 100px;
              height: 100px;
            }

            p {
              line-height: 40px;
            }

            &:hover {
              color: @xtxColor;
            }
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>
