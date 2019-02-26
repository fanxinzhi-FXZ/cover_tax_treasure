const ajax = require('../utils/ajax.js');
const util = require('../utils/utils.js');

const index = {
  // 获取我的信息
  get_myrelate_person: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/get_myrelate_person', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },
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
  // 删除订单
  mineOrderdel: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/delete_order', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },
  // 找回订单-获取验证码
  mineOrderCode: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/user/send_roundstr', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },
  // 找回订单-获取验证码后提交
  mineOrderCodeSubmit: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/user/registerOrlogin', data, function (data) {
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
  },
  // 我的理赔列表
  claim_settlement_list: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/claim_settlement_list', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  },
  // 我的理赔列表-详情
  claim_settlement_detail: function (data, callback) {
    ajax.post('https://www.beishuibao.com/bank/wei/order/claim_settlement_detail', data, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  }

};

module.exports = index;