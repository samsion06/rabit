<template>
  <!--顶部-->
  <AppTopnav />
  <!--吸顶头部（独立模块），每个页面都要看见所以放在这个地方-->
  <AppHeaderSticy />
  <!--头部-->
  <AppHeader />
  <div class="main">
    <router-view></router-view>
  </div>
  <AppFooter />
</template>

<script>
  import AppTopnav from '@/components/app-topnav.vue'
  import AppHeader from '@/components/app-header.vue'
  import AppFooter from '@/components/app-footer.vue'
  import AppHeaderSticy from '@/components/app-header-sticky.vue'

  import { useStore } from 'vuex'
  export default {
    name: 'layout',
    components: {
      AppTopnav,
      AppHeader,
      AppFooter,
      AppHeaderSticy
    },
    setup() {
      const store = useStore()
      store.dispatch('category/getCategoryList') //actionname.modelusname category
      return {
        //https://blog.csdn.net/weixin_43290151/article/details/124954767
      }
    }

  }
</script>

<style scoped lang="less">
</style>
