const ajax = require('../utils/ajax.js');
const util = require('../utils/utils.js');

const user = {

  // 用户登录
  login: function (callback) {
    wx.login({
      success: function (res) {
         
        ajax.post('https://www.beishuibao.com/bank/wei/author/getAuthor_infor', {
          code: res.code
        }, function (data) {
          if (data.errcode == 0) {
            wx.setStorageSync('WXTOKEN', data.data.code_token);
            callback()
          } else {
            util.toast(data.errdesc, 'none', 2000);
          }
        })
      },
      fail: function (res) {

        util.toast('登录失败', 'none', 2000);
      }
    });
  },

  // 检查session_key
  checkSession: function (callback) {
    if (wx.getStorageSync("WXTOKEN")) {
      wx.checkSession({
        success: function (res) {
         
        },
        fail: function (res) {
          user.login(function () {
            callback()
          })
        }
      })
    } else {
      user.login(function () {
        callback()
      })
    }
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