// pages/order/ordre.js
const store = require("../../../data/store.js");
const index = require('../../../server/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerImgItems: [
      {
      "name": "黄金计划",
      "goodSId": 1,
      "price": "50元",
        "background": "linear-gradient(90deg, #ff971c, #fdc429 50%, #ff971c,);"
      },
      {
        "name": "钻石计划",
        "goodSId": 2,
        "price": "150元",
        "background": "linear-gradient(90deg, #4e82f5, #4eb0f5 50%, #4e82f5);"
      },
      {
        "name": "大富翁计划",
        "goodSId": 3,
        "price": "300元",
        "background": "linear-gradient(90deg, #ff6c1c, #fa7063 50%,#ff6c1c );"
      }
    ],
    swiperCurrent: 0,
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
    vm.setData({ swiperCurrent: options.id - 1 });
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
  goInfoFill: function(){
    wx.navigateTo({
      url: '/pages/cart/infoFill/infoFill'
    })
  },

  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})