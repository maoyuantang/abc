<template>
  <div class="page-account template-login-data">
    <div class="page-account-container">
      <div class="page-account-top">
        <div class="page-account-top-logo">
          <!-- <img src="@/assets/images/logo-white.png" alt="logo"> -->
          <div class="page-account-top-title">
            <p class="page-account-top-title-cn">统一门户</p>
            <p class="page-account-top-title-en">Unified Portal</p>
          </div>
        </div>
      </div>
        <div class="template-login-data-main">
          <Login @on-submit="handleSubmit">
            <UserName name="loginName" />
            <Password name="passWord" enter-to-submit />
            <SliderCheck ref="sliderCheck" :isDisabled="!isPass"></SliderCheck>
            <Submit :loading="submitting">登录</Submit>
          </Login>
          <div class="page-account-other template-login-data-other">
            <Divider size="small">其它登录方式</Divider>
            <!-- <img src="@/assets/svg/icon-social-wechat.svg" alt="wechat" @click="handleOtherLogin">
            <img src="@/assets/svg/icon-social-qq.svg" alt="qq" @click="handleOtherLogin">
            <img src="@/assets/svg/icon-social-weibo.svg" alt="weibo" @click="handleOtherLogin"> -->
          </div>
        </div>
    </div>
    <!-- <i-copyright class="template-login-data-copyright" /> -->
  </div>
</template>
<script>
import SliderCheck from './components/sliderCheck'
// import { postApi } from '@/api/index'
import mixiIndex from '@/mixins/index'
import { mapActions } from 'vuex'
import CONSTANT from '@/plugins/request/constant'
export default {
  mixins: [mixiIndex],
  components: {
    SliderCheck
  },
  data () {
    return {
      isPass: true,
      autoLogin: true,
      submitting: false
    }
  },
  methods: {
    ...mapActions(['login']),
    /**
     * @description 登录
     * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
     */
    handleSubmit (valid, values) {
      if (!this.$refs.sliderCheck.rangeStatus) {
        this.$refs.sliderCheck.innerHTML = '请先进行验证'
        this.$refs.sliderCheck.innerHTMLColor = '#e41181'
        return
      }
      if (valid) {
        this.submitting = true
        const { loginName, passWord } = values
        this.login({
          loginName,
          passWord,
          vfCode: this.$refs.sliderCheck.vfCode,
          loginSource: 'pc-web',
          appCode: CONSTANT.APP_CODE
        }).then(() => {
          this.submitting = false
          // 重定向对象不存在则返回顶层路径
          this.$router.replace(this.$route.query.redirect || '/home')
        })
      }
    },
    /**
     * @description 其他登录方式
     */
    handleOtherLogin () {
      this.$Message.warning({
        content: '功能暂未开放！'
      })
    }
  }
}
</script>
<style lang="less">
.template-login-data {
  // background-image: url("../../../assets/images/bg-login-data.jpg") !important;
  background-size: cover !important;
  &-main {
    background: #fff;
    border-radius: 10px;
    padding: 32px 16px 16px 16px;
  }
  &-other {
    text-align: center;
    img {
      margin: 0 16px;
    }
  }
  &-copyright {
    * {
      color: #fff !important;
    }
  }
}
.page-account-top-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  .page-account-top-app {
    height: 60px;
    line-height: 60px;
    margin-left: 8px;
    font-size: 42px;
    color: #ffffff;
  }
  .page-account-top-title {
    height: 60px;
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    &-cn {
      line-height: 36px;
      font-size: 22px;
      color: #eeeeee;
      letter-spacing: 4px;
    }
    &-en {
      line-height: 24px;
      font-size: 16px;
      color: #aaaaaa;
    }
  }
}
</style>
