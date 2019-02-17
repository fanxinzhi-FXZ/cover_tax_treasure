// pages/login/login.js
const user = require('../../../server/user.js');
const util = require('../../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPhone: '',
    validateCode: '',
    userCode: '',
    invitationPhone: '',
    loginSended: true,
    loginVerification: '获取验证码',
    agreementSelect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 清空手机号
   */
  deletePhone: function(){
    this.setData({
      userPhone: ''
    })
  },

  /**
   *手机号
   */
  phone: function(e){
    this.setData({
      userPhone: e.detail.value
    })
  },

  /**
   * 验证码
   */
  validate: function(e){
    this.setData({
      validateCode: e.detail.value
    })
  },

  /**
* 获取验证码
*/
  onSendCodes() {

    var vm = this;

    if (/^[1][3,4,5,7,8][0-9]{9}$/.test(vm.data.userPhone)) {
      if (vm.data.loginSended) {
        vm.data.loginSended = false
        //调用验证码接口
        user.getCode(vm.data.userPhone, "is_regist", function (res) {
          var seconds = 60, timer;
          timer = setInterval(function (data) {

            if (seconds > 1) {
              seconds = seconds - 1;
              vm.data.loginVerification = seconds + "s"
            } else {
              vm.data.loginSended = true;
              vm.data.loginVerification = "获取验证码"
              clearTimeout(timer);
            }
            console.log(res)
            vm.setData({
              loginVerification: vm.data.loginVerification,
              loginSended: vm.data.loginSended,
              userCode: res
            })
          }, 1000);
        },function(){
          vm.setData({
            loginVerification: "获取验证码",
            loginSended: true
          })
        })
      }
    } else {
      util.toast("请输入正确的手机号！", "none", 2000);
    }
  },

  /**
   * 邀请人
   */
  invitation: function (e) {
    this.setData({
      invitationPhone: e.detail.value
    })
  },

  /**
   * 登录
   */
  onGotUserInfo: function(e){
    var vm = this;
    var userInfo = e.detail.userInfo;
    if (/^[1][3,4,5,7,8][0-9]{9}$/.test(vm.data.userPhone)){
      if (vm.data.validateCode && vm.data.userCode == vm.data.validateCode){
        // 判断是否已同意协议
        if (vm.data.agreementSelect) {
          // 请求用户手机号登录绑定接口
          user.userPhoneLogin(vm.data.userPhone, vm.data.validateCode, userInfo.nickName, userInfo.avatarUrl, vm.data.invitationPhone, function (data) {
            wx.switchTab({ url: '/pages/index/index' })
          })
        } else {
          util.toast("请阅读并同意《被税宝用户协议》！", "none", 2000);
        }
      }else {
        util.toast("请输入正确的验证码！", "none", 2000);
      }
    }else {
      util.toast("请输入正确的手机号！", "none", 2000);
    }
  },

  /**
   * 用户是否同意协议
   */
  agreementCheck: function(){
    this.setData({
      agreementSelect: !this.data.agreementSelect
    })
  }
})