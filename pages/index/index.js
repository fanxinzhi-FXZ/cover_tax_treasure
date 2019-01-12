//index.js
const store = require('../../data/store.js');

Page({
  data: {
    bannerImgItems: store.index.bannerItems,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    indicatorActiveColor: "#ffffff",

    swiperHeight: 0,
    swiperWidth: 0,
  },

  onLoad: function() {
    var vm = this;
    // 获取屏幕宽度，设置banner的宽高
    wx.getSystemInfo({
      success: function (res) {
        vm.setData({
          swiperHeight: res.screenWidth / 2.4193,
          swiperWidth: res.screenWidth
        })
      }
    })
  }
})
