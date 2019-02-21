// pages/cart/infoCheck/infoCheck.js
const order = require('../../../server/order.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    orderItems: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderId)
    order.orderDetail(options.orderId, function(data){
      this.setData({
        orderId: options.orderId,
        orderItems: data
      })
    })
    
  },

  /**
   * 去支付
   */
  goPayment: function(){
    wx.navigateTo({
      url: '/pages/cart/payment/payment'
    })
  }
})