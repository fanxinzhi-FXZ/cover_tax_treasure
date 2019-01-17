// pages/order/ordre.js
const store = require("../../../data/store.js");

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

    contentItems: [
      {
        "title": "理赔额度",
        "number": "￥500"
      },
      {
        "title": "理赔额度",
        "number": "￥500"
      },
      {
        "title": "理赔额度",
        "number": "￥500"
      },
      {
        "title": "理赔额度",
        "number": "￥500"
      }
    ],
    buyNoticeItem: store.cart.buyNoticeItem

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this;

  },

  /**
   * 轮播图滑动
   */
  swiperChange: function(e){
    console.log(e.detail.current);
    this.setData({
      swiperCurrent: e.detail.current   //获取当前轮播图片的下标
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})