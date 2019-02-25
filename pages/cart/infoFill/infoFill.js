// pages/cart/infoFill.js
const store = require("../../../data/store.js");
const utils = require("../../../utils/utils.js");
const index = require('../../../server/index.js');
const order = require('../../../server/order.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flightNumber: '',  // 航班号
    airportName: '',   // 到达机场
    arrivalDate: '',   // 回国日期
    fareName: '',      // 旅客姓名
    fareNumber: '',    // 证件号码
    farePhone: '',     // 手机号码
    fareEmail: '',     // 邮箱地址
    totalPrice: 0,     // 商品总价

    startDate: '',
    endDate: '',

    productItems: [],

    contractExplainStatus: false,
    statementCheck: false,
    buyNoticeItem: store.cart.buyNoticeItem,

    buyBlanId: 1, //计划ID
    agentPhone: '' // 代理人手机号
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
        totalPrice: data[options.goodsId - 1].price - data[options.goodsId - 1].reduced_price,
        swiperCurrent: options.id - 1,
        buyBlanId: options.goodsId
      })
    })

    vm.setData({
      startDate: utils.formatTime(new Date, 0),
      endDate: utils.formatTime(new Date, 1),
      agentPhone: wx.getStorageSync('INVITATION')
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
  airportTap: function (e) {
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
    for (var i = 0; i < this.data.productItems.length ; i++ ){
      if (this.data.productItems[i].id == e.currentTarget.dataset.id){
        this.setData({
          totalPrice: this.data.productItems[i].price - this.data.productItems[i].reduced_price
        })
      }
    }
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
    var vm = this;
    // 验证行程信息是否完善
    if (vm.data.flightNumber && vm.data.airportName && vm.data.arrivalDate){
      // 验证姓名是否是中英文
      if ((/^[\u4E00-\u9FA5A-Za-z]+$/.test(vm.data.fareName))){
        // 验证手机号
        if ((/^1[34578]\d{9}$/.test(vm.data.farePhone))){
          // 验证邮箱
          if ((/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(vm.data.fareEmail))){
            // 验证身份证号
            if ((/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(vm.data.fareNumber))){

              var orders = [
                {
                  'product_id': vm.data.buyBlanId, // 产品ID
                  'mobile': vm.data.farePhone,
                  'ic_name': vm.data.fareName,
                  'ic_card': vm.data.fareNumber,
                  'email': vm.data.fareEmail,
                  'price': vm.data.totalPrice
                }
              ];
              // 进行下一步
              wx.navigateTo({
                url: '/pages/cart/infoCheck/infoCheck?orders=' + JSON.stringify(orders) + '&totalPrice=' + vm.data.totalPrice + '&flightNumber=' + vm.data.flightNumber + '&arrivalDate=' + vm.data.arrivalDate + '&airportName=' + vm.data.airportName
              })
            }else {
              utils.toast("请输入正确的证件号码", "none", 2000)
            }
          }else {
            utils.toast("请输入正确的邮箱", "none", 2000)
          }
        }else {
          utils.toast("请输入正确的手机号", "none", 2000)
        }
      }else {
        utils.toast("请输入您的真实姓名", "none", 2000)
      }
    }else {
      utils.toast("请完善行程信息", "none", 2000)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})