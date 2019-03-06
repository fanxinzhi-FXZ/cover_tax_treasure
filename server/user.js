const ajax = require('../utils/ajax.js');
const util = require('../utils/utils.js');

const user = {

  // 用户登录
  login: function (callback) {
    wx.login({
      success: function (res) {
        user.thirdLogin(res.code, function(){
          callback()
        })
      },
      fail: function (res) {

        util.toast('登录失败', 'none', 2000);
        callback()
      }
    });
  },

  // 检查session_key
  checkSession: function (callback) {
    wx.checkSession({
      success: function (res) {
        
      },
      fail: function (res) {
        user.login()
      }
    })
  },

  // 三方登录验证
  thirdLogin: function (code, callback){
    ajax.post('https://www.beishuibao.com/bank/wei/author/getAuthor_infor', {
      code: code
    }, function (data) {
      if (data.errcode == 0) {
        wx.setStorageSync('WXTOKEN', data.data.code_token);
        ajax.post('https://www.beishuibao.com/bank/wei/user/third_login', {
          token: data.data.code_token
        }, function (data1) {
          if (data1.errcode == 0) {
            wx.setStorageSync('ISNEWUSER', false);
            wx.setStorageSync('TOKEN', data1.data.token);
            wx.setStorageSync('USERINFO', data1.data);
            callback()
          } else {
            wx.setStorageSync('ISNEWUSER', true);
            util.toast(data1.errdesc, 'none', 2000);
            callback()
          }
        })
      } else {
        util.toast(data.errdesc, 'none', 2000);
        wx.setStorageSync('ISNEWUSER', true);
        callback()
      }
    })
  },

  // 获取验证码
  getCode: function (phone, type, success, fail){
    ajax.post('https://www.beishuibao.com/bank/wei/user/send_roundstr', {
      type: type, 
      user_tel: phone,
    }, function (data) {
      if (data.errcode == 0) {
        success(data.data)
      } else {
        fail()
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },

  // 用户手机注册
  userPhoneLogin: function (phone, code, nickName, pic, inviteMobile, callback){
    ajax.post('https://www.beishuibao.com/bank/wei/user/program_login', {
      mobile : phone,
      roundstr: code, // 验证码
      open_code: wx.getStorageSync('WXTOKEN'), // 回执openid编码
      nick_name: nickName, // 昵称
      pic : pic,  // 头像 全链接
      invite_mobile: inviteMobile // 邀请人手机号
    }, function (data) {
      if (data.errcode == 0) {
        wx.setStorageSync('USERINFO', data.data);
        wx.setStorageSync('TOKEN', data.data.token);
        callback(data.data)
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  }

};

module.exports = user;