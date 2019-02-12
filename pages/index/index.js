//index.js
const store = require('../../data/store.js');
const index = require('../../server/index.js');

Page({
  data: {
    bannerImgItems: store.index.bannerItems,
    indicatorDots: true,
    swiperautoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    productCircular: false,
    indicatorActiveColor: "#ffffff",
    productActiveColor: "#4d6ce3",

    swiperHeight: 0,
    swiperWidth: 0,

    commonItems: store.index.commonItems,

    productItems:[]
  },

  onLoad: function() {
    var vm = this;

    index.planLoad(function(data){
      console.log(data)
      vm.setData({
        productItems: data
      })
    })
    
    // 安排测试
    // wx.navigateTo({
    //   url: '/pages/cart/payment/payment'
    // })
  },

  // 了解详情
  goDetail: function(){
    wx.navigateTo({
      url: '/pages/cart/detail/detail'
    })
  }
})
