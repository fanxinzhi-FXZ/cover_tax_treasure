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
    agentPhone: '', // 代理人手机号

    travellerItems: [],
    indexNumber: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this;
    console.log(options.goodsId)
    index.planLoad(function (data) {
      var dataItems = [
        {
          'product_id': options.goodsId, // 产品ID
          'mobile': '',
          'ic_name': '',
          'ic_card': '',
          'email': '',
          'price': data[options.goodsId - 1].price - data[options.goodsId - 1].reduced_price
        }
      ]
      vm.setData({
        productItems: data,
        travellerItems: dataItems,
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
   * 添加旅客
   */
  addInfo: function(){
    var info = {
      'product_id': 1, // 产品ID
      'mobile': '',
      'ic_name': '',
      'ic_card': '',
      'email': '',
      'price': this.data.productItems[0].price - this.data.productItems[0].reduced_price,
    };
    var item = this.data.travellerItems;
    var price = 0;
    item.push(info)
    for (var j = 0; j < item.length; j++) {
      for (var i = 0; i < this.data.productItems.length; i++) {
        if (this.data.productItems[i].id == item[j].product_id) {

          price += this.data.productItems[i].price - this.data.productItems[i].reduced_price
        }
      }
    }
    this.setData({
      travellerItems: item,
      totalPrice: price
    })
  },

  /**
   * 查看电子合约
   */
  goFailUrl: function () {
    wx.navigateTo({
      url: "/pages/mine/fail/failurl/failurl?pageurl=" + "https://www.beishuibao.com/media/pdf/contract.pdf"
    })
  },

  /**
   * 删除旅客信息
   */
  deleteInfo: function(e){
    var item = this.data.travellerItems;
    item.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      travellerItems: item
    })
  },

  /**
   * 当前操作的旅客信息是第几个
   */
  indexTap: function (e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      indexNumber: e.currentTarget.dataset.index
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
    var data = this.data.travellerItems;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var prices = e.currentTarget.dataset.price;
    var money = e.currentTarget.dataset.money;
    var price = 0;

    data[index].product_id = id;
    data[index].price = parseInt(prices) - parseInt(money);
    
    for (var j = 0; j < data.length; j++ ){
      for (var i = 0; i < this.data.productItems.length; i++) {
        if (this.data.productItems[i].id == data[j].product_id) {

          price += this.data.productItems[i].price - this.data.productItems[i].reduced_price
        }
      }
    }

    this.setData({
      travellerItems: data,
      totalPrice: price
    })
  },

  /**
   * 旅客名称
   */
  nameInput: function (e) {
    var item = this.data.travellerItems;
    item[this.data.indexNumber].ic_name = e.detail.value
    this.setData({
      travellerItems: item
    })
  },

  /**
   * 证件号码
   */
  fareNumberTap: function (e) {
    var item = this.data.travellerItems;
    item[this.data.indexNumber].ic_card = e.detail.value
    this.setData({
      travellerItems: item
    })
  },

  /**
   * 用户邮箱
   */
  emailTap: function (e) {
    var item = this.data.travellerItems;
    item[this.data.indexNumber].email = e.detail.value
    this.setData({
      travellerItems: item
    })
  },

  /**
   * 手机号码
   */
  phoneTap: function (e) {
    var item = this.data.travellerItems;
    item[this.data.indexNumber].mobile = e.detail.value
    this.setData({
      travellerItems: item
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
    var test = false;
    // 验证行程信息是否完善
    if (vm.data.statementCheck){
      if (vm.data.flightNumber && vm.data.airportName && vm.data.arrivalDate){
        var item = this.data.travellerItems;
        
        for(var i = 0; i < item.length; i++){

          // 验证姓名是否是中英文
          if ((/^[\u4E00-\u9FA5A-Za-z]+$/.test(item[i].ic_name))) {
            // 验证手机号
            if ((/^1[34578]\d{9}$/.test(item[i].mobile))) {
              // 验证邮箱
              if ((/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(item[i].email))) {
                // 验证身份证号
                if (item[i].ic_card) {
                  test = true
                } else {
                  utils.toast("请输入正确的证件号码", "none", 2000);
                  return;
                }
              } else {
                utils.toast("请输入正确的邮箱", "none", 2000);
                return;
              }
            } else {
              utils.toast("请输入正确的手机号", "none", 2000);
              return;
            }
          } else {
            utils.toast("请输入您的真实姓名", "none", 2000);
            return;
          }
        }
      }else {
        utils.toast("请完善行程信息", "none", 2000)
      }
    }else {
      utils.toast("请阅读并同意合约声明", "none", 2000)
    };

    if(test){
      // 进行下一步
      wx.navigateTo({
        url: '/pages/cart/infoCheck/infoCheck?orders=' + JSON.stringify(vm.data.travellerItems) + '&totalPrice=' + vm.data.totalPrice + '&flightNumber=' + vm.data.flightNumber + '&arrivalDate=' + vm.data.arrivalDate + '&airportName=' + vm.data.airportName
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})