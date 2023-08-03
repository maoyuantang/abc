import request from '@/plugins/request'

// Json格式，POST方式，接口调用封装方法
export async function postApi (url, data) {
  return request(url, {
    data,
    method: 'POST'
  })
}

// Json格式，GET方式，接口调用封装方法
export async function getApi (url, data) {
  return request(url, {
    data,
    method: 'GET'
  })
}

// Form格式，POST方式，接口调用封装方法
export async function postFormApi (url, data) {
  return request(url, {
    data,
    method: 'POST',
    contentType: 'form'
  })
}

// Form格式，GET方式，接口调用封装方法
export async function getFormApi (url, data) {
  return request(url, {
    data,
    method: 'GET',
    contentType: 'form'
  })
}
