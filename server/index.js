const ajax = require('../utils/ajax.js');
const util = require('../utils/utils.js');

const index = {

  // 首页计划加载
  planLoad: function (callback){
    ajax.post('https://www.beishuibao.com/bank/wei/product/getProduct_list', {}, function (data) {
      if (data.errcode == 0) {
        callback && callback(data.data || {})
      } else {
        util.toast(data.errdesc, 'none', 2000);
      }
    })
  }

};

module.exports = index;