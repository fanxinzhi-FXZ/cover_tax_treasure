// pages/mine/mine.js
const Img_URL = 'http://www.beishuibao.com/web_pic/program/';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_photo: Img_URL + 'icon_sample.png',
    user_name:'王小小'
  },
  // 退出登录
  link_logout: function () {
    wx.navigateTo({
      url: '/pages/logout/logout'
    })
  },
  // 信息修改
  modifyInfo: function () {
    wx.navigateTo({
      url: '/pages/modifyInfo/modifyInfo'
    })
  }
})