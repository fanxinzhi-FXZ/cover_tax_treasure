// pages/mine/mineOrder/mineOrder.js
const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
const mine = require('../../../server/mine.js');
Page({
  data: {
    _num:'all',
    hasData:true,
    noData: Img_URL + 'img_empty.png',
    orderData:[],
    page:1,
    number:5
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    that.init(that.data._num);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    that.addData(that.data._num);
  },
  onLoad: function () {
    var that = this;
    var status = 'all';
    that.init(status);
  },
  init:function (status) {
    var that = this;
    var token = wx.getStorageSync('TOKEN');
    var params = {
      token: token,
      page: 1,
      number: that.data.number,
      status: status // all:全部  paying:未完成  completed:已完成
    }
    mine.mineOrder(params, function (data) {
      console.log(data)
      if(data.length > 0){
        that.setData({
          hasData: true
        });
      }else{
        that.setData({
          hasData: false
        });
      }
      that.setData({
        orderData: data
      });
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })
  },
  addData:function (status) {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    console.log(status);
    var page = that.data.page + 1;
    var token = wx.getStorageSync('TOKEN');
    var params = {
      token: token,
      page: page,
      number: that.data.number,
      status: status // all:全部  paying:未完成  completed:已完成
    }
    mine.mineOrder(params, function (data) {
      console.log(data)
      // 回调函数
      var orderData_list = that.data.orderData;

      for (var i = 0; i < data.length; i++) {
        orderData_list.push(data[i]);
      }
      // 设置数据
      that.setData({
        orderData: that.data.orderData_list,
        page:that.data.page + 1
      })
      // 隐藏加载框
      wx.hideLoading();
    })
  },
  // 切换tanb
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var that = this;
    that.init(e.target.dataset.num);
  },
  // 找回订单
  findOrder: function () {
    wx.navigateTo({
      url: "/pages/mine/mineOrder/findOrder/findOrder"
    })
  },
  // 查看订单详情
  seeOrder(e){
    var infoID = e.target.dataset.id;
    wx.navigateTo({
      url: "/pages/mine/mineOrder/orderInfo/orderInfo?id=" + infoID
    })
  }
})