<!--左侧栏目-->
<template>
  <div class='home-category' @mouseleave="categoryId=null">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id" @mouseenter="getCategoryId(item.id)"
        :class="{active:categoryId==item.id}">
        <!--：class=>鼠标移入右边查看商品时候，左侧的绿色区域还需要保留-->
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <!--没有二级类目数据的时候不去渲染，不然遍历报错-->
        <template v-if="item.children">
          <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in item.children" :key="sub.id">{{sub.name}}
          </RouterLink>
        </template>
        <span v-else>
          <!--骨架 预加载样式-->
          <XtxSkeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
    </ul>

    <!--菜单右侧分类信息炭层-->
    <div class="layer">
      <h4>{{currentCategory && currentCategory.id=='brand-chilren'?'品牌':'分类'}}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!--v-if会监听属性,变化后重新渲染视图-->
      <ul v-if="currentCategory&&currentCategory.goods&&currentCategory.goods.length">
        <li v-for="good in currentCategory.goods" :key="good.id">
          <RouterLink :to="`/product/${good.id}`">
            <img :src="good.picture">
            <div class="info">
              <p class="name ellipsis-2">{{good.name}}</p>
              <p class="desc ellipsis">{{good.desc}}</p>
              <p class="price"><i>¥</i>{{good.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!--品牌-->
      <ul v-if="currentCategory&&currentCategory.brands&&currentCategory.brands.length">
        <li class="brand" v-for="brand in currentCategory.brands" :key="brand.id">
          <RouterLink to="/">
            <img :src="brand.picture">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{brand.place}}</p>
              <p class="name ellipsis">{{brand.name}}</p>
              <p class="desc ellipsis-2">{{brand.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { reactive, ref, computed, watch, onBeforeMount, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import brandApi from '@/api/brand.js'
  export default {
    name: 'HomeCategory',
    setup(props, context) {
      const store = useStore()

      //拉去品牌数据
      onBeforeMount(async () => {
        let res = await brandApi.findBrand(6) //这里用then 或者这种也没啥意义 随便
        brand.brands = res.result
        // console.log("brands", JSON.stringify(brand.brands));
      })

      const brand = reactive({
        //nav
        id: 'brand-chilren',
        name: '品牌推荐',
        //数据
        brands: []
      })

      //store拉分类列表数据
      //computed数据做页面渲染的话要最好保证不是异步的数据，不然页面渲染的时候没有取不到这个值会报错，除非用v-if来控制是否渲染
      //或者是渲染的数据有默认值
      const menuList = computed(() => {
        const list = store.state.category.list.map(item => {
          //重组了一下分类列表的数据
          return {
            id: item.id,
            name: item.name,
            // 防止初始化没有children的时候调用slice函数报错
            children: item.children && item.children.slice(0, 2),
            goods: item.goods ? item.goods : []
          }
        })
        list.push(brand) //这里把brand的饮用插进去了
        return list
      })

      //拉去每个分类的商品信息
      //这种方法先拿空数组在页面占位，防止for遍历的时候出错，等watch监听到数据后再进行渲染，
      //这样就不用在页面加上v-if
      // const currentCategory = ref([])
      // watch(categoryId, (currentId) => {
      //   currentCategory.value = menuList.value.find(item => item.id == currentId)
      // })
      //reactive ref 这种渲染视图的数据给的默认值就是为了防止没有数据的时候渲染错误

      //栏目渲染
      const currentCategory = computed(() => {
        //最后一项：proxy {id: 'brand-chilren', name: '品牌推荐', brands: Array(10)}
        // console.log("menuList.value", JSON.stringify(menuList.value));
        return menuList.value.find(item => item.id == categoryId.value)
      })

      //获取一级分类栏目id
      const categoryId = ref(null)

      function getCategoryId(id) {
        categoryId.value = id
        //console.log("categoryId.value", categoryId.value);
      }
      return {
        //数据
        menuList,
        currentCategory,
        categoryId,
        //方法
        getCategoryId

      }
    }
  }
</script>

<style scoped lang='less'>
  .home-category {
    width: 250px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    /* 底色 */
    position: relative;
    /* 这个地方没用absoulate */
    z-index: 99;

    .menu {
      li {
        padding-left: 40px;
        height: 50px;
        line-height: 50px;

        &:hover,
        &.active {
          background: @xtxColor;
        }

        a {
          margin-right: 4px;
          color: #fff;

          &:first-child {
            font-size: 16px;
          }
        }
      }
    }

    /* 弹层 */
    .layer {
      width: 990px;
      height: 500px;
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      left: 250px;
      top: 0;
      display: none;
      /*!*/
      padding: 0 15px;

      h4 {
        font-size: 20px;
        font-weight: normal;
        line-height: 80px;

        small {
          font-size: 16px;
          color: #666;
        }
      }

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 310px;
          height: 120px;
          margin-right: 15px;
          margin-bottom: 15px;
          border: 1px solid #eee;
          border-radius: 4px;
          background: #fff;

          &.brand {
            height: 180px;

            a {
              align-items: flex-start;

              img {
                width: 120px;
                height: 160px;
              }

              .info {
                p {
                  margin-top: 8px;
                }

                .place {
                  color: #999;
                }
              }
            }
          }

          &:nth-child(3n) {
            margin-right: 0;
          }

          a {
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            padding: 10px;

            &:hover {
              background: #e3f9f4;
            }

            img {
              width: 95px;
              height: 95px;
            }

            .info {
              padding-left: 10px;
              line-height: 24px;
              width: 190px;

              .name {
                font-size: 16px;
                color: #666;
              }

              .desc {
                color: #999;
              }

              .price {
                font-size: 22px;
                color: @priceColor;

                i {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }

    &:hover {
      .layer {
        display: block;
      }
    }
  }

  /**骨架效果 （没看出哪里有效果）**/
  .xtx-skeleton {
    animation: fade 1s linear infinite alternate;
  }

  @keyframes fade {
    from {
      opacity: 0.2;
    }

    to {
      opacity: 1;
    }
  }
</style>
