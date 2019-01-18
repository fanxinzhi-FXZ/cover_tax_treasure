// pages/cart/infoFill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 去信息核对页面
   */
  goInfoCkeck: function(){
    wx.navigateTo({
      url: '/pages/cart/infoCheck/infoCheck'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})