<template>
  <LoginHeader>联合登录</LoginHeader>
  <section class="container">
    <nav class="tab">
      <a @click="hasAccount=true" :class="{active:hasAccount}" href="javascript:;">
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a @click="hasAccount=false" :class="{active:!hasAccount}" href="javascript:;">
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <LoginFooter />
</template>

<script>
  import LoginHeader from './components/login-header'
  import LoginFooter from './components/login-footer'
  import CallbackBind from './components/callback-bind'
  import CallbackPatch from './components/callback-patch'

  import { ref } from 'vue'
  export default {
    name: 'PageLogin',
    components: {
      LoginHeader,
      LoginFooter,
      CallbackBind,
      CallbackPatch
    },
    setup() {
      //判断是否已经有账号
      const hasAccount = ref(true)
      const nickname = ref(null)
      const avatar = ref(null)
      const unionId = ref('')
      //拿到openid 传到接口上
      QC.Login.getMe((openId) => {
        unionId.value = openId
        console.log("openId", openId);
        // userQQLogin(openId).then(data => {
        //     console.log("data",data);
        // })
      })


      // 1. 准备下信息：unionId(openId) qq头像 昵称
      // 2. 完成表单校验
      // 3. 发送验证吗（校验，定义api，调用，完成倒计时）
      // 4. 进行绑定（绑定成功就是登录成功）
      if (QC.Login.check()) {
        QC.api('get_user_info').success(res => {
          avatar.value = res.data.figureurl_1
          nickname.value = res.data.nickname
          console.log(res);
        })
      }

      return { hasAccount, nickname, avatar }
    }
  }
</script>

<style scoped lang='less'>
  .container {
    padding: 25px 0;
  }

  .tab {
    background: #fff;
    height: 80px;
    padding-top: 40px;
    font-size: 18px;
    text-align: center;

    a {
      color: #666;
      display: inline-block;
      width: 350px;
      line-height: 40px;
      border-bottom: 2px solid #e4e4e4;

      i {
        font-size: 22px;
        vertical-align: middle;
      }

      span {
        vertical-align: middle;
        margin-left: 4px;
      }

      &.active {
        color: @xtxColor;
        border-color: @xtxColor;
      }
    }
  }

  .tab-content {
    min-height: 600px;
    background: #fff;
  }
</style>
