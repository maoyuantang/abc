import axios from 'axios'
import Setting from '@/setting'
import qs from 'qs'
import util from '@/libs/util'
import CONSTANT from './constant'
import router from '@/router'
import { Message, Notice, Modal, Spin } from 'view-ui-plus'
// 创建一个 axios 实例
const service = axios.create({
  baseURL: Setting.apiBaseUrl,
  timeout: 1000 * 50 // 请求超时时间
})

let isRelogin = true

// 创建一个错误
function errorCreate (msg) {
  const err = new Error(msg)
  errorLog(err)
  // throw err; // 这里不能throw异常，否则不会进入接口的then方法
}

// 记录和显示错误
function errorLog (err) {
  // 添加到日志
  // store.dispatch('admin/log/push', {
  //   message: '数据请求异常',
  //   type: 'error',
  //   meta: {
  //     error: err
  //   }
  // })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.error('>>>>>> Error >>>>>>')
  }
  // 显示提示，可配置使用 iView 的 $Message 还是 $Notice 组件来显示
  if (Setting.errorModalType === 'Message') {
    setTimeout(() => {
      Message.error({
        content: err.message,
        duration: Setting.modalDuration
      })
    }, 300)
  } else if (Setting.errorModalType === 'Notice') {
    setTimeout(() => {
      Notice.error({
        title: '提示',
        desc: err.message,
        duration: Setting.modalDuration
      })
    }, 300)
  }
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    const authToken = util.cookies.get('auth-token')
    config.headers['auth-token'] = (authToken && authToken !== '') ? authToken : '123'
    if (config.contentType === 'form' || config.contentType === 'notice') {
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    } else {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    let result
    switch (response.status) {
      case 200:
      {
        const data = response.data
        if (response.headers['content-type'] === 'application/vnd.ms-excel;charset=UTF-8') { // 文件流下载
          result = data
          return result
        }
        if (data.code === CONSTANT.CODE_SUCCESS || data.code === CONSTANT.RESP_CODE_SUCCESS) {
          if (data.data && (data.data.respCode === CONSTANT.CODE_SUCCESS || data.data.code === CONSTANT.CODE_SUCCESS || data.data.respCode === CONSTANT.RESP_CODE_SUCCESS)) {
            result = data.data
          } else if (!data.data) {
            result = true
          } else if (data.data) {
            result = data.data
          } else {
            // 业务异常
            errorCreate(data.data.respDesc || '业务繁忙！')
          }
        } else {
          // 系统异常
          errorCreate(data.message || data.respDesc || '系统繁忙！')
        }
        break
      }
    }
    // 在这里对返回的数据进行处理
    return result
  },
  error => {
    Spin.hide()
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '400: 请求错误'; break
        case 401:
        {
          error.message = '401: 未授权，请登录'
          const data = error.response.data
          if (data.code !== CONSTANT.CODE_SUCCESS) {
            if (data.data && data.data.respCode === CONSTANT.RESP_CODE_AE401) {
              // 未登录或Token过期
              if (isRelogin) {
                isRelogin = false
                localStorage.removeItem('cartNum') // 清除用户登录信息
                sessionStorage.removeItem('userData') // 清除用户登录信息
                sessionStorage.removeItem('auth') // 清除用户登录信息
                sessionStorage.removeItem('uOrgList')// 清除用户登录信息
                sessionStorage.removeItem('isChangeFlag')// 清除用户登录信息
                util.cookies.remove('auth-token') // 清除cookie登录票据
                Modal.info({
                  title: '提示',
                  content: '登录失效，请重新登录！',
                  onOk: () => {
                    router.push({
                      name: 'login',
                      query: {
                        redirect: router.app.$route.fullPath
                      }
                    })
                  }
                })
                // 重置计时器
                setTimeout(() => {
                  isRelogin = true
                }, 5000)
              }
            }
          }
          break
        }
        case 403: error.message = '403: 拒绝访问'; break
        case 404: error.message = `404: ${error.response.config.url}`; break
        case 408: error.message = '408: 请求超时'; break
        case 500: error.message = '500: 服务器内部错误'; break
        case 501: error.message = '501: 服务未实现'; break
        case 502: error.message = '502: 网关错误'; break
        case 503: error.message = '503: 服务不可用'; break
        case 504: error.message = '504: 网关超时'; break
        case 505: error.message = '505: HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default function request (url, option) {
  const httpUrl = url.control
  let reqUrl = ''
  if (option.method === 'GET') {
    const arr = []
    // _.forIn(option.data, (val, key) => { arr.push(key) }) // 参数不为空对象
    for (const key in option.data) {
      if (Object.hasOwnProperty.call(option.data, key)) {
        // const val = option.data[key]
        arr.push(key)
      }
    }
    reqUrl = (option.data && arr.length) ? httpUrl + '?' + qs.stringify(option.data) : httpUrl
  } else {
    reqUrl = httpUrl
  }
  const defaultOptions = {
    method: 'POST',
    url: reqUrl,
    contentType: option.contentType
  }
  const newOptions = { ...defaultOptions, ...option }
  return service({
    ...newOptions
  }).then(res => {
    return res
  })
}
