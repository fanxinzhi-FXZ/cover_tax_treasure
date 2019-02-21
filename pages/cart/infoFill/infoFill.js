// pages/cart/infoFill.js
const store = require("../../../data/store.js");
const utils = require("../../../utils/utils.js");
const index = require('../../../server/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flightNumber: '', // 航班号
    airportName: '',  // 到达机场
    arrivalDate: '',   // 回国日期
    fareName: '',     // 旅客姓名
    fareNumber: '',   // 证件号码
    farePhone: '',    // 手机号码
    fareEmail: '',    // 邮箱地址

    startDate: '',
    endDate: '',

    productItems: [],

    contractExplainStatus: false,
    statementCheck: false,
    buyNoticeItem: store.cart.buyNoticeItem,

    buyBlanId: 1 //计划ID
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this;
    console.log(options.goodsId)
    index.planLoad(function (data) {
      vm.setData({
        productItems: data,
        swiperCurrent: options.id - 1,
        buyBlanId: options.goodsId
      })
    })

    vm.setData({
      startDate: utils.formatTime(new Date, 0),
      endDate: utils.formatTime(new Date, 1)
    })
  },
  
  /**
   * 输入航班号
   */
  flightTap: function(e){
    this.setData({
      flightNumber: e.detail.value
    })
  },

  /**
   * 输入机场名
   */
  airportTapTap: function (e) {
    this.setData({
      airportName: e.detail.value
    })
  },

  /**
   * 选择回国日期
   */
  arrivalDateChange: function(e){
    this.setData({
      arrivalDate: e.detail.value
    })
  },

  /**
   * 选择购买计划
   */
  checkBuyBlab: function(e){
    this.setData({
      buyBlanId: e.currentTarget.dataset.id
    })
  },

  /**
   * 旅客名称
   */
  nameTap: function (e) {
    this.setData({
      fareName: e.detail.value
    })
  },

  /**
   * 证件号码
   */
  fareNumberTap: function (e) {
    this.setData({
      fareNumber: e.detail.value
    })
  },

  /**
   * 用户邮箱
   */
  emailTap: function (e) {
    this.setData({
      fareEmail: e.detail.value
    })
  },

  /**
   * 手机号码
   */
  phoneTap: function (e) {
    this.setData({
      farePhone: e.detail.value
    })
  },
  
  /**
   * 合约声明--是否同意合约
   */
  statementCheck: function(){
    this.setData({
      statementCheck: !this.data.statementCheck
    })
  },

  /**
   * 合约说明--合约说明显示/隐藏
   */
  contractExplainShow: function(){
    this.setData({ contractExplainStatus : true})
  },
  contractExplainHide: function () {
    this.setData({ contractExplainStatus : false })
  },

  /**
   * 去信息核对页面
   */
  goInfoCkeck: function(){
    wx.navigateTo({
      url: '/pages/cart/infoCheck/infoCheck'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})