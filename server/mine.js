const ajax = require('../utils/ajax.js');
const util = require('../utils/utils.js');

const index = {

  // 找回订单-获取列表
  mineOrder: function (data,callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/get_my_orderlist', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },
  // 找回订单-列表详情
  mineOrderInfo: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/get_order_detail', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },
  // 信息修改-获取信息======http://www.beishuibao.com/bank/user/update_info
  getmodifyInfo: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/user/get_userinfor', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },
  // 信息修改-修改信息======http://www.beishuibao.com/bank/user/update_info
  modifyInfo: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/user/update_info', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  }

};

module.exports = index;