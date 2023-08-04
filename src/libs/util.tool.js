import CryptoJS from 'crypto-js/crypto-js'

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse('12345678901234561234567890123456')// ""中与后台一样
const IV = CryptoJS.enc.Utf8.parse('')// ""中与后台一样

class Tool {
  // 是否IE浏览器
  isIE () {
    return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
  }

  typeOf (obj) {
    const toString = Object.prototype.toString
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    return map[toString.call(obj)]
  }

  /**
    * 获取url后面的参数
    * @param name
    * @returns {string}
    */
  getQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg) // 获取url中"?"符后的字符串并正则匹配
    let context = ''
    if (r != null) context = r[2]
    reg = null
    r = null
    return context === null || context === '' || context === 'undefined' ? '' : context
  }

  // aes加密
  encrypt (word, keyStr, ivStr) {
    let key = keyStr || KEY
    let iv = ivStr || IV
    key = CryptoJS.enc.Utf8.parse(key)
    iv = CryptoJS.enc.Utf8.parse(iv)
    const srcs = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
  }

  // aes解密
  decrypt (word, keyStr, ivStr) {
    let key = keyStr || KEY
    let iv = ivStr || IV
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
    const srcs = CryptoJS.enc.Hex.parse(word)
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: srcs }, key, {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}

export default new Tool()
