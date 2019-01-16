// pages/changePassword/changePassword.js
const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
Page({
  data: {
    newEye: Img_URL +'icon_see.png',
    newNoEye: Img_URL + 'icon_onsee.png',
    real_newEye: Img_URL + 'icon_see.png',
    real_newNoEye: Img_URL + 'icon_onsee.png',
    showNew_type:'text',
    new_password: '',
    showNew: true,
    showReal_type:'text',
    Real_password:'',
    showReal:true,
  },
  // 手机号输入框获取
  mobileFunc: function () {

  },
  newInput: function (e) {
    var password = e.detail.value;
    this.setData({
      new_password: password
    })
  },
  newFunc:function () {
    var _this = this;
    if (_this.data.showNew) {   //如果_this.data.showNew为true,则表示为密码小黑点
      _this.setData({
        showNew: false,
        showNew_type: "password"
      })
    } else {
      _this.setData({
        showNew: true,
        showNew_type: "text"
      })
    }
  },
  real_newFunc:function () {
    var _this = this;
    if (_this.data.showReal) {   //如果_this.data.showReal为true,则表示为密码小黑点
      _this.setData({
        showReal: false,
        showReal_type: "password"
      })
    } else {
      _this.setData({
        showReal: true,
        showReal_type: "text"
      })
    }
  },
  real_newInput:function (e) {
    var password = e.detail.value;
    this.setData({
      Real_password: password
    })
  }
})