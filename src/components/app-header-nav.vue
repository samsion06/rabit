<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/home">首页</RouterLink>
    </li>
    <!--v-for遍历的时候要有数据不然会报错-->
    <li v-for="item in list" :key="item.id" @mouseenter="show(item)" @mouseleave="hide(item)">
      <!--RouterLink=>a-->
      <router-link :to="`/category/${item.id}`" @click="hide(item)">{{item.name}}</router-link>
      <div class="layer" :class="{open:item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture" alt="">
              <p>{{sub.name}}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, watch, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  //api.now is not a function vue-devtolls过期
  //控制分类展示/隐藏
  const categoryVisible = (store, router) => {
    function show(item) {
      store.commit('category/show', item)
    }

    function hide(item) {
      store.commit('category/hide', item)
    }
    return { show, hide }
  }
  export default {
    name: 'app-head-nav',
    setup() {
      const store = useStore()
      const router = useRouter()
      //分类列表数据
      const list = computed(() => {
        return store.state.category.list //异步数据
      })
      //控制分类展示/隐藏
      const { show, hide } = categoryVisible(store)
      return {
        list,
        show,
        hide,
      }
    }
  }
</script>

<style scoped lang='less'>
  .app-header-nav {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    >li {
      margin-right: 40px;
      width: 38px;
      text-align: center;

      >a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }

      &:hover {
        >a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      }

    }
  }

  .layer {
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all .2s .1s;

    &.open {
      height: 132px;
      opacity: 1;
    }



    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;

      li {
        width: 110px;
        text-align: center;

        img {
          width: 60px;
          height: 60px;
        }

        p {
          padding-top: 10px;
        }

        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>
