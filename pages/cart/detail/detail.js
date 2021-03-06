// pages/order/ordre.js
const store = require("../../../data/store.js");
const index = require('../../../server/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    backgroundItems: [
        "linear-gradient(90deg, #ff971c, #fdc429 50%, #ff971c,);",
        "linear-gradient(90deg, #4e82f5, #4eb0f5 50%, #4e82f5);",
        "linear-gradient(90deg, #ff6c1c, #fa7063 50%,#ff6c1c );"
        ],
    detailItems: ['经济实用', '销量冠军', '土豪专属'],
    detailSeeds: ['普通物品赔付比：100% ', '适用绝大部分奢侈品', '适用绝大部分奢侈品，赔付比更高'],
    swiperCurrent: 0,
    itemShowId: 0,
    indicatorDots: true,
    swiperautoplay: false,
    interval: 5000,
    duration: 500,
    circular: true,
    productCircular: false,
    indicatorActiveColor: "#4d6ce3",

    productItems: [],
    buyNoticeItem: store.cart.buyNoticeItem

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var vm = this;
    index.planLoad(function (data) {
      vm.setData({
        productItems: data,
        swiperCurrent: options.id - 1
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 轮播图滑动
   */
  swiperChange: function(e){
    this.setData({
      swiperCurrent: e.detail.current   //获取当前轮播图片的下标
    })
  },

  /**
   * 
   * 去信息填写页面
   */
  goInfoFill: function(e){
    wx.navigateTo({
      url: '/pages/cart/infoFill/infoFill?goodsId=' + e.target.dataset.id
    })
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})