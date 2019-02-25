// pages/cart/payment/payment.js
const order = require('../../../server/order.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderItems: [],
    orderId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this;
    order.orderDetail(options.orderId, function(data){
      console.log(data)
      vm.setData({
        orderItems: data,
        orderId: options.orderId
      })
    })
  },

  /**
   * 支付
   */
  pay: function(){
    var vm = this;

    order.orderPay(vm.data.orderId, function(){
      console.log("支付成功")
    }, function(){
      console.log("支付失败")
    })
  }

})