<template>
  <!--筛选区域-->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a :class="{active:filterData.selectedBrand===brand.id}" href="javasript:;" v-for="brand in filterData.brands"
          :key="brand.id">{{brand.name}}</a>
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{p.name}}：</div>
      <div class="body">
        <a :class="{active:p.selectedProp===attr.id}" href="javasript:;" v-for="attr in p.properties"
          :key="attr.id">{{attr.name}}</a>
      </div>
    </div>
  </div>
</template>
<script>
  import categoryApi from '@/api/category'
  import { useRoute } from 'vue-router'
  import { watch, ref } from 'vue'
  export default {
    name: 'SubFilter',
    setup() {
      const route = useRoute()
      //console.log("route", route);=>proxy{}
      //筛选区数据
      const filterLoading = ref(null)
      const filterData = ref(null)
      //获取筛选区域数据？
      watch(() => route.params.id, (secCategoryId) => {
        console.log(secCategoryId);
        if (secCategoryId && '/category/sub/' + secCategoryId == route.path) {
          filterLoading.value = true //这干嘛的
          categoryApi.findSubCategoryFilter(secCategoryId).then(({ result }) => {
            //在返回的数据中插入一组全部
            //品牌全部
            result.selectedBrand = null //加一个字段
            result.brands.unshift({ id: null, name: '全部' })
            //销售属性全部
            result.saleProperties.forEach(p => {
              p.selectedProp = undefined
              p.properties.unshift({ id: null, name: '全部' })
            })
            filterData.value = result
            filterLoading.value = false
            //console.log("result", result);
          })
        }
      }, { immediate: true })
      return {
        filterData
      }
    }
  }
</script>
<style scoped lang='less'>
  /*  筛选区 */
  .sub-filter {
    background: #fff;
    padding: 25px;

    .item {
      display: flex;
      line-height: 40px;

      .head {
        width: 80px;
        color: #999;
      }

      .body {
        flex: 1;

        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;

          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
