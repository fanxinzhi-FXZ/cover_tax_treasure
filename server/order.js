const ajax = require('../utils/ajax.js');
const util = require('../utils/utils.js');

const order = {

  // 创建订单
  setUpOrders: function(totalPrice, flightNumber, arriveTime, arriveAddress, orders,callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/creat_order', {
      total_price: totalPrice,  //总价
      flight_number: flightNumber,  // 航班号
      arrive_time: arriveTime,   //到达时间
      arrive_address: arriveAddress,  //到达机场
      invite_mobile: wx.getStorageSync('INVITATION') || '', //邀请人手机号
      pay_type: 'wei', // 支付方式
      orders: orders
    }, function (data) {
      if (data.errcode == 0) {
        callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },

  // 订单详情
  orderDetail: function (order_id, callback){
    ajax.post('https://www.beishuibao.com/bank/wei/order/get_order_detail', {
      token: wx.getStorageSync('TOKEN'),
      order_id: order_id
    }, function (data) {
      if (data.errcode == 0) {
        callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },

  //支付
  orderPay: function (order_id, success, fail) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/pay_order', {
      token: wx.getStorageSync('TOKEN'),
      order_id: order_id,
      pay_type : 'wei',  // wei: 微信  ali:支付宝  card：银行卡
      is_pc: 'n'
    }, function (data) {
      if (data.errcode == 0) {
        wx.requestPayment({
          timeStamp: JSON.stringify(data.data.pay_url.timeStamp),
          nonceStr: data.data.pay_url.nonceStr,
          package: data.data.pay_url.package,
          signType: data.data.pay_url.signType,
          paySign: data.data.pay_url.paySign,
          success: success,
          fail: fail
        })
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },

};

module.exports = order;