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
            wx.setStorageSync('TOKEN', data.data.code_token);
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
    if (wx.getStorageSync("TOKEN")) {
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
  }

};

module.exports = user;