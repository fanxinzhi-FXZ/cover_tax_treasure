// pages/cart/infoFill.js
const store = require("../../../data/store.js");
const utils = require("../../../utils/utils.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate: '',
    endDate: '',
    arrivalDate: '',

    contractExplainStatus: false,
    statementCheck: false,
    buyNoticeItem: store.cart.buyNoticeItem,

    buyBlanId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startDate: utils.formatTime(new Date, 0),
      endDate: utils.formatTime(new Date, 1)
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