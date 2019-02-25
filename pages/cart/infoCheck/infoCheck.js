// pages/cart/infoCheck/infoCheck.js
const order = require('../../../server/order.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderItems: [],
    optionsData: [],
    agentPhone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(JSON.parse(options.orders))
    this.setData({
      optionsData: options,
      orderItems: JSON.parse(options.orders),
      agentPhone: wx.getStorageSync('INVITATION')
    })
  },

  /**
   * 去支付
   */
  goPayment: function(){
    var vm = this;

    order.setUpOrders(vm.data.optionsData.totalPrice, vm.data.optionsData.flightNumber, vm.data.optionsData.arrivalDate, vm.data.optionsData.airportName, vm.data.optionsData.orders, function (data) {
      wx.navigateTo({
        url: '/pages/cart/payment/payment?orderId=' + data.order_id
      })
    })
    
  }
})