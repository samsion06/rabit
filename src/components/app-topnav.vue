<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{profile.account}}</a></li>
          <li><a href="javascript:;" @click="$store.commit('user/loginOut')">退出登录</a></li>
        </template>
        <li v-else><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li><a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
  import { useStore } from 'vuex'

  export default {
    name: 'app-topnav',
    setup() {
      const store = useStore()
      const { profile } = store.state.user //proxy{} store定义的都不用ref,reactive

      return {
        profile,
      }
    }
  }
</script>

<style scoped lang="less">
  .app-topnav {
    background: #333;
    z-index: 9999;


    ul {
      display: flex;
      height: 53px;
      justify-content: flex-end;
      align-items: center;

      li {
        a {
          padding: 0 15px;
          color: #cdcdcd;
          line-height: 1;
          display: inline-block;

          i {
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: @xtxColor;
          }
        }

        ~li {
          a {
            border-left: 2px solid #666;
          }
        }
      }
    }
  }
</style>
