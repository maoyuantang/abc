const CONSTANT = {
  // public
  APP_CODE: 'uap',
  // System
  CODE_SUCCESS: '0',
  RESP_CODE_SUCCESS: '0000',
  RESP_CODE_ERR: '8888',
  RESP_CODE_E403: 'E403', // 无权访问
  RESP_CODE_AE401: 'AE401', // 未登录或Token过期

  MAXEXPORTNUM: 50000, // 最大导出数量
  COOKIE_EXPIRES: 2 * 60 * 60 * 1000 // cookie有效时长（单位：毫秒）
}
export default CONSTANT
