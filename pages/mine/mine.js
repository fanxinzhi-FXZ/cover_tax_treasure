// pages/mine/mine.js
const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
const mine = require('../../server/mine.js');
const util = require('../../utils/utils.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_photo: Img_URL + 'icon_sample.png',
    user_name:'王小小',
    wxInfo: wx.getStorageSync('USERINFO')
  },
  onLoad(e){
    var that = this;
    var info = wx.getStorageSync('USERINFO');
    console.log(info)
    var params = {
      token: wx.getStorageSync('TOKEN')
    }
    mine.get_myrelate_person(params, function (data) {
      console.log(data)
      that.setData({
        user_name:data[0]
      })
    })
  },
  // 退出登录
  link_logout: function () {
    wx.navigateTo({
      url: '/pages/mine/logout/logout'
    })
  },
  // 信息修改
  modifyInfo: function () {
    wx.navigateTo({
      url: '/pages/mine/modifyInfo/modifyInfo'
    })
  },
  // 修改密码
  link_password:function () {
    wx.navigateTo({
      url: '/pages/mine/changePassword/changePassword'
    })
  },
  // 我的理赔
  mineSettlement:function () {
    wx.navigateTo({
      url: "/pages/mine/mineSettlement/mineSettlement"
    })
  },
  // 我的订单
  order(){
    wx.navigateTo({
      url: "/pages/mine/mineOrder/mineOrder"
    })
  },
  // 我要代理
  agency(){
    wx.navigateTo({
      url: "/pages/mine/agency/agency"
    })
  },
  // 文件查询及下载
  readFile(){
    wx.navigateTo({
      url: "/pages/mine/fail/fail"
    })
  },
  // 关于我们
  aboutUS(){
    wx.navigateTo({
      url: "/pages/mine/aboutUS/aboutUS"
    })
  }
})