<template>
  <HomePanel title="最新专题">
    <template v-slot:right>
      <XtxMore />
    </template>
    <div class="special-list" ref="homeSpecial">
      <div class="special-item" v-for="item in list" :key="item.id">
        <RouterLink to="/">
          <img :src="item.cover" alt />
          <div class="meta">
            <p class="title">{{item.title}}<small>{{item.summary}}</small></p>
            +<span class="price">&yen;{{item.lowestPrice}}起</span>
          </div>
        </RouterLink>
        <div class="foot">
          <span class="like"><i class="iconfont icon-hart1"></i>{{item.collectNum}}</span>
          <span class="view"><i class="iconfont icon-see"></i>{{item.viewNum}}</span>
          <span class="reply"><i class="iconfont icon-message"></i>{{item.replyNum}}</span>
        </div>
      </div>
    </div>
  </HomePanel>
</template>

<script>
  import HomePanel from './home-pannel'
  import homeApi from '@/api/home'
  import { useLazyData } from '@/hooks'
  export default {
    name: 'HomeSpecial',
    components: { HomePanel },
    setup() {
      const { target, data } = useLazyData(homeApi.findSpecial)
      return { target, list: data }
    }
  }
</script>
