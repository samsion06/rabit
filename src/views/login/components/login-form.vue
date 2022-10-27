<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <!--账号密码登录 class loginform作唯一标识-->
      <el-form ref="DialogForm" :model="loginForm" :rules="rules" :size="formSize" status-icon style="padding: 0 40px;"
        class="loginForm" v-if="isMsgLogin==false">
        <el-form-item label-width="40px" style="border: solid 1px #ddd;" prop="account">
          <template #label>
            <i class="iconfont icon-user"></i>
          </template>
          <el-input v-model="loginForm.account" />
        </el-form-item>
        <el-form-item label-width="40px" style="border: solid 1px #ddd;" prop="password">
          <template #label>
            <i class="iconfont icon-code"></i>
          </template>
          <el-input v-model="loginForm.password" />
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox v-model="loginForm.isAgree" label="我已同意" size="large" />
          <a href="javascript:;" style="color: blue">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;" style="color: blue">《服务条款》</a>
        </el-form-item>
        <el-form-item>
          <el-button @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <!--短信登录-->
      <el-form v-else :model="messageForm" ref="DialogForm1" style="padding: 0 40px;">
        <el-form-item :rules="[
        { required: true, message: 'mobile is required' },
      ]" prop="mobile" label="手机号">
          <el-input v-model="messageForm.mobile">
            <template #append>
              <el-button type="primary" @click="sendCode" :disabled="time!=0"> {{time==0?'发送验证码':`${time}秒后发送`}}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input v-model="messageForm.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="messAgeLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="action">
      <a
        href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
        <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      </a>
      <!--拿到按钮回掉链接后自己搞一个icon-->
      <!--  <span id="qqLoginBtn"></span> -->
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { userAccountLogin, userMobileLoginMsg, userMobileLogin } from '@/api/user'
  import { ElMessage } from 'element-plus'
  import QC from 'qc'
  export default {
    name: 'LoginForm',
    setup() {

      // onMounted(() => {
      //   //等标签渲染完再插入
      //   QC.Login({
      //     btnId: "qqLoginBtn" //插入按钮的节点id
      //   });
      // })

      const loginForm = reactive({
        account: '',
        password: ''
      })
      const DialogForm = ref(null)
      const store = useStore()
      const router = useRouter()
      const route = useRoute()

      //校验规则
      const rules = {
        account: [{
          required: true,
          message: '请输入用户名'
        }],
        password: [{
          required: true,
          message: '请输入密码'
        }],
        isAgree: [{
          required: true,
          message: '请勾选协议'
        }]
      }
      //登录
      function login() {
        // console.log("route.query", route.query);
        DialogForm.value.validate(async (valid) => {
          if (valid) {
            try {
              let res = await userAccountLogin(loginForm)
              //缓存用户信息
              store.commit('user/serUser', { id, account, nickname, avatar, token, mobile })

              //拉取线上购物车信息
              store.dispatch('cart/mergeLocalCart').then(() => {
                router.push(route.query.redirectUrl || '/')
                ElMessage({ message: '登录成功', status: 'success' })
              })

            } catch (err) {
              ElMessage({ message: err.data.message, status: 'error' })
            }
          }
        })
      }
      // 是否短信登录
      const isMsgLogin = ref(true)
      const messageForm = reactive({
        mobile: '',
        code: ''
      })
      const DialogForm1 = ref(null)
      let time = ref(0)
      //发送验证码
      function sendCode() {
        DialogForm1.value.validate((valid) => {
          if (valid) {
            if (time.value == 0) {
              userMobileLoginMsg(messageForm.mobile).then(res => {
                messageForm.code = res.code
              })
              time.value = 60
              let timer = window.setInterval(() => {
                time.value--
                if (time.value <= 0) {
                  clearInterval(timer)
                }
              }, 1000)
            }
          }
        })
      }
      //短信登录
      function messAgeLogin() {
        DialogForm1.value.validate((valid) => {
          if (valid) {
            console.log("messageForm", messageForm);
            userMobileLogin(messageForm).then(res => {
              const { id, account, nickname, avatar, token, mobile } = res.result
              //缓存用户信息
              store.commit('user/setUser', { id, account, nickname, avatar, token, mobile })
              //拉取线上购物车信息
              store.dispatch('cart/mergeLocalCart').then(() => {
                router.push(route.query.redirectUrl || '/')
                ElMessage({ message: '登录成功', status: 'success' })
              })
            }, err => {
              console.log("err", err);
            })
          }
        })
      }
      //13241051259  123456

      return {
        isMsgLogin,
        loginForm,
        DialogForm,
        DialogForm1,
        rules,
        login,
        messAgeLogin,
        messageForm,
        sendCode,
        time,
      }
    }
  }
</script>




<style lang="less">
  // 账号容器
  .account-box {
    .toggle {
      padding: 15px 40px;
      text-align: right;

      a {
        color: @xtxColor;

        i {
          font-size: 14px;
        }
      }
    }

    .form {
      .loginForm {
        .el-form-item {
          margin-bottom: 28px;
        }

        .el-form-item:nth-child(4) {
          margin-bottom: 0;
        }

        .el-form-item__label {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        //校验提示样式
        .el-form-item.is-required .el-form-item__label:before {
          content: "";
        }

        .el-form-item__error {
          padding-top: 9px;
        }

        .el-input__wrapper {
          outline: none;
          border: none;
          box-shadow: none;
          height: inherit;
        }

        //单选框勾选时的颜色
        .el-checkbox__inner {
          background: #ffffff;
          border-color: @xtxColor ;

          &::after {
            border-color: @xtxColor ;
          }
        }

        .el-checkbox__label {
          color: gray;
        }

        //登录按钮
        .el-button {
          border-radius: none;
          line-height: 40px;
          background: @xtxColor;
          color: #ffffff;
          border: none;
          width: 100%;
        }

      }




      &-item {
        margin-bottom: 28px;
        padding: 0 40px;

        .input {
          position: relative;
          height: 36px;

          .code {
            position: absolute;
            right: 1px;
            top: 1px;
            text-align: center;
            line-height: 34px;
            font-size: 14px;
            background: #f5f5f5;
            color: #666;
            width: 90px;
            height: 34px;
            cursor: pointer;
          }
        }

        >.error {
          position: absolute;
          font-size: 12px;
          line-height: 28px;
          color: @priceColor;

          i {
            font-size: 14px;
            margin-right: 2px;
          }
        }
      }

      .agree {
        a {
          color: #069;
        }
      }

      .btn {
        display: block;
        width: 100%;
        height: 40px;
        color: #fff;
        text-align: center;
        line-height: 40px;
        background: @xtxColor;

        &.disabled {
          background: #cfcdcd;
        }
      }
    }

    .action {
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .url {
        a {
          color: #999;
          margin-left: 10px;
        }
      }
    }
  }
</style>
