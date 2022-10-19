<template>
  <!--筛选区域-->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a :class="{active:filterData.selectedBrand===brand.id}" href="javasript:;" v-for="brand in filterData.brands"
          :key="brand.id" @click="changeBrand(brand.id)">{{brand.name}}</a>
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{p.name}}：</div>
      <div class="body">
        <a :class="{active:p.selectedProp===attr.id}" href="javasript:;" v-for="attr in p.properties" :key="attr.id"
          @click="changeAttr(p,attr.id)">{{attr.name}}</a>
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
    setup(props, { emit }) {
      const route = useRoute()
      //console.log("route", route);=>proxy{}
      const filterLoading = ref(null)
      //筛选区数据
      const filterData = ref(null)
      //渲染筛选区域数据
      watch(() => route.params.id, (secCategoryId) => {
        console.log(secCategoryId);
        if (secCategoryId && '/category/sub/' + secCategoryId == route.path) {
          filterLoading.value = true //这干嘛的
          categoryApi.findSubCategoryFilter(secCategoryId).then(({ result }) => {
            //重组一下返回的数据
            //在返回的数据中插入一组全部
            //品牌全部
            result.selectedBrand = null //加一个字段
            result.brands.unshift({ id: null, name: '全部' })
            //销售属性全部
            result.saleProperties.forEach(p => {
              p.selectedProp = undefined //加一个字段
              p.properties.unshift({ id: null, name: '全部' })
            })
            //重组后的数据
            filterData.value = result
            filterLoading.value = false
            console.log("重组后筛选去渲染数据：", result);
          })
        }
      }, { immediate: true })

      //选择品牌
      function changeBrand(brandId) {
        //选择已经选中的品牌
        if (filterData.value.brandId == brandId) {
          return
        } else {
          filterData.value.selectedBrand = brandId
          emit('filter-change', getFilterParams())
        }
      }

      // 选中属性
      function changeAttr(p, attrId) {
        if (p.selectedProp === attrId) return
        p.selectedProp = attrId
        emit('filter-change', getFilterParams())
      }

      //获取筛选参数
      function getFilterParams() {
        const filterParams = {}
        const attrs = []
        //获取选中的品牌，存储到请求参数中
        filterParams.brandId = filterData.value.selectedBrand
        //获取选中的属性
        filterData.value.saleProperties.forEach(p => {
          //{selectedprops, {attr.id}}
          const attr = p.properties.find(attr => attr.id === p.selectedProp)
          if (attr && attr.id !== undefined) {
            //{属性名： ，属性值，}
            attrs.push({ groupName: p.name, propertyName: attr.name })
          }
        })
        if (attrs.length) filterParams.attrs = attrs
        return filterParams
      }


      return {
        filterData,
        filterLoading,
        changeBrand,
        changeAttr
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
