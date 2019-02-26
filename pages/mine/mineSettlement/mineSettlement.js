// index.js
const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
const mine = require('../../../server/mine.js');
Page({
  data: {
    has:true,
    _num:0,
    now: Img_URL + 'shenghe1.png',
    end: Img_URL + 'shenghe2.png',
    settleData: [],
    page: 1,
    number: 5
  },
  // 切换tanb
  menuClick: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
    var that = this;
    that.init(e.target.dataset.num);
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
    var status = 0;
    that.init(status);
  },
  init:function (status) {
    var that = this;
    var token = wx.getStorageSync('TOKEN');
    var params = {
      token: token,
      page: 1,
      number: that.data.number,
      status: status // 0 新的 1：历史
    }
    mine.claim_settlement_list(params, function (data) {
      console.log(data)
      if(data.length > 0){
        that.setData({
          has: true
        });
      }else{
        that.setData({
          has: false
        });
      }
      that.setData({
        settleData: data
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
      status: status // 0 新的 1：历史
    }
    mine.claim_settlement_list(params, function (data) {
      console.log(data)
      // 回调函数
      var settleData_list = that.data.settleData;

      for (var i = 0; i < data.length; i++) {
        settleData_list.push(data[i]);
      }
      // 设置数据
      that.setData({
        settleData: that.data.settleData_list,
        page:that.data.page + 1
      })
      // 隐藏加载框
      wx.hideLoading();
    })
  },
  // 申请理赔
  applyfor(){
    wx.navigateTo({
      url: "/pages/mine/mineSettlement/applyfor/applyfor"
    })
  },
  // 详情
  goHasInfo(e){
    var infoID = e.target.dataset.id;
    wx.navigateTo({
      url: "/pages/mine/mineSettlement/settleInfo/settleinfo?id=" + infoID
    })
  }
 
})
