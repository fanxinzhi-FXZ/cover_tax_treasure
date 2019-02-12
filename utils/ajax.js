//  utils/ajax.js

/*
  说明：POST 请求方法
*/
const post = function (url, data, callback, loading) {

  //  如果需要则显示正在加载
  (loading == true) && wx.showLoading();
  wx.request({
    url: url,
    // data: data,
    data: Object.assign({
      // token: wx.getStorageSync("TOKEN") ? wx.getStorageSync("TOKEN") : '',
    }, data),
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (data) {

      callback && callback(data.data || {});
    },
    fail: function (res) {

      callback && callback({ code: 400, message: res || '发生未知错误' });
    },
    complete: function (res) {

      (loading == true) && wx.hideLoading();
    }
  });
};

/*
  说明：GET 请求方法
*/
const getres = function (url, data, callback, loading) {

  //  如果需要则显示正在加载
  (loading == true) && wx.showLoading();

  //  发起请求
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (data) {

      callback && callback(data.data || { });
    },
    fail: function (res) {

      callback && callback({ code: 400, message: res || '发生未知错误' });
    },
    complete: function (res) {

      (loading == true) && wx.hideLoading();
    }
  });
}

module.exports = {
  post: post,
  getres: getres
}
