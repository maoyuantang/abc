import axios from 'axios'
import Setting from '@/setting'
// import qs from 'qs'

export default function request (url, option) {
  // const httpUrl = url.control
  // let reqUrl = ''
  // if (option.method === 'GET') {
  //   const arr = []
  //   _.forIn(option.data, (val, key) => { arr.push(key) }) // 参数不为空对象
  //   reqUrl = (option.data && arr.length) ? httpUrl + '?' + qs.stringify(option.data) : httpUrl
  // } else {
  //   reqUrl = httpUrl
  // }
  // const defaultOptions = {
  //   method: 'POST',
  //   url: reqUrl,
  //   contentType: option.contentType
  // }
  // const newOptions = { ...defaultOptions, ...option }

  // return service({
  //   ...newOptions
  // }).then(res => {
  //   return res
  // })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: Setting.apiBaseURL,
  timeout: 1000 * 50 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use()
