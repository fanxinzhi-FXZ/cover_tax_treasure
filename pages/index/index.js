//index.js
const store = require('../../data/store.js');

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

    productItems:[
      {
        "icon": "http://www.beishuibao.com/web_pic/program/list1_icon_gold.png",
        "title": "黄金计划",
        "data":  [
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
        ]
      },
      {
        "icon": "http://www.beishuibao.com/web_pic/program/list1_icon_diamond.png",
        "title": "钻石计划",
        "data": [
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
        ]
      },
      {
        "icon": "http://www.beishuibao.com/web_pic/program/list1_icon_crown.png",
        "title": "大富翁计划",
        "data": [
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
          {
            "title": "理赔额度",
            "text": "500"
          },
        ]
      }
    ]
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
