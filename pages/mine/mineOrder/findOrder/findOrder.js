const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
const mine = require('../../../../server/mine.js');
const util = require('../../../../utils/utils.js');
Page({
  data: {
    codeImg: Img_URL +'icon_label1.png',
    mobile:'',
    code:'',
    getResCode:'',
    findSended:true,
    findVerification: '获取验证码'
  },
  // 获取手机号码
  mobileFunc(e){
    this.setData({
      mobile: e.detail.value
    })
  },
    // 获取输入的验证码
  codeFunc(e){
    this.setData({
      code: e.detail.value
    })
  },
  // 点击获取验证码
  getCode(){

    var vm = this;
    var token = wx.getStorageSync('TOKEN');
    var params = {
      type: "is_all",//'is_on' :修改密码时调用; 'is_regist': 注册时调用; is_all：找回订单
      user_tel:vm.data.mobile
    }
    if (/^[1][3,4,5,7,8][0-9]{9}$/.test(vm.data.mobile)) {
      if (vm.data.findSended) {
        vm.data.findSended = false
        //调用验证码接口
        mine.mineOrderCode(params, function (res) {
          var seconds = 60, timer;
          timer = setInterval(function (data) {

            if (seconds > 1) {
              seconds = seconds - 1;
              vm.data.findVerification = seconds + "s"
            } else {
              vm.data.findSended = true;
              vm.data.findVerification = "获取验证码"
              clearTimeout(timer);
            }
            console.log(res)
            vm.setData({
              findVerification: vm.data.findVerification,
              findSended: vm.data.findSended,
              getResCode: res
            })
          }, 1000);
        }, function () {
          vm.setData({
            findVerification: "获取验证码",
            findSended: true
          })
        })
      }
    } else {
      util.toast("请输入正确的手机号！", "none", 2000);
    }
  },

  seeOrder(){
    console.log(this.data.mobile)
    console.log(this.data.code);
    console.log(this.data.getResCode)
    var that = this;
    var params = {
      roundstr: that.data.getResCode,
      mobile:that.data.mobile
    }
    if (/^[1][3,4,5,7,8][0-9]{9}$/.test(that.data.mobile)) {
      if (that.data.code == that.data.getResCode) {
        mine.mineOrderCodeSubmit(params, function (res) {
          wx.navigateTo({
            url: "/pages/mine/mineOrder/orderInfo/orderInfo?id=" + res.id
          })
        })
      }else{
        util.toast("请输入正确的验证码！", "none", 2000);
      }
    }else{
      util.toast("请输入正确的手机号！", "none", 2000);
    }
    
    
    // wx.navigateTo({
    //   url: "/pages/mine/mineOrder/orderInfo/orderInfo"
    // })
  }
})