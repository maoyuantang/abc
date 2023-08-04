import util from '@/libs/util'
import { postApi } from '@/api'
import CONSTANT from '@/plugins/request/constant'
import Setting from '@/setting'
export default {
  state: {
    store: '1'
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param loginName {String} 用户账号
     * @param {Object} param passWord {String} 密码
     * @param {Object} param vfCode {String} 滑块验证码
     * @param {Object} param loginSource {String} 登录方式
     * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login ({ dispatch, commit }, {
      loginName = '',
      passWord = '',
      vfCode = '',
      loginSource = '',
      appCode = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        const params = {
          loginName,
          passWord,
          vfCode,
          loginSource,
          appCode
        }
        params.passWord = util.tool.encrypt(params.passWord, '1234567890123456', '')
        postApi(this.API.umc_login, params).then(async res => {
          if (res) {
            // 设置 cookie 一定要存 uuid 和 auth-token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // auth-token 代表用户当前登录状态 建议在网络请求中携带 auth-token
            // 如有必要 auth-token 需要定时更新，默认保存一天，可在 setting.js 中修改
            // 设置cookie
            util.cookies.set('COOKIE_EXPIRES', res.loginExpTime || CONSTANT.COOKIE_EXPIRES) // 设置cooike有效时长
            const expires = new Date(new Date().getTime() + (res.loginExpTime ? res.loginExpTime * 1 : CONSTANT.COOKIE_EXPIRES))
            util.cookies.set('auth-token', res.token, { expires }) // 改由后端设置带domain的cookie
            // 获取用户信息，保存到 vuex
            await dispatch('getUserInfo', expires)
            // 用户登录后从持久化数据加载一系列的设置
            await dispatch('load', { loadOpenedTabs: Setting.page.loadOpenedTabs })
            dispatch('setRouter')
            resolve()
          } else {
            reject(new Error())
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
