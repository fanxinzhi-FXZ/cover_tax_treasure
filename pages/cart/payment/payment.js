// pages/cart/payment/payment.js
const order = require('../../../server/order.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderItems: [],
    orderId: '',
    isPay: false,
    orderState: true
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
   * 关闭支付页面
   */
  clockdel: function(){
    this.setData({
      isPay: false
    })
  },

  /**
   * 支付
   */
  pay: function(){
    var vm = this;

    order.orderPay(vm.data.orderId, function(){
      vm.setData({
        isPay: true,
        orderState: true
      })
    }, function(){
      vm.setData({
        isPay: true,
        orderState: false
      })
    })
  }

})