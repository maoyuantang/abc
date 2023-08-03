export default {
  // 获取验证码
  umc_getVfcode: {
    // mock: true,
    control: 'udp/auc/users/signup/getVfcode'
  },
  // 登录
  umc_login: {
    // mock: true,
    control: 'udp/auc/users/signup/login'
  },
  // 查询用户信息
  umc_getUserInfo: {
    // mock: true,
    control: 'udp/auc/auth/getUserInfo'
  },
  // 查询菜单列表
  umc_getUserMenus: {
    // mock: true,
    control: 'udp/auc/auth/getUserMenus'
  }
}
