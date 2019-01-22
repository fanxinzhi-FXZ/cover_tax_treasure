// pages/mine/mineOrder/mineOrder.js
const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
Page({
  data: {
    _num:1,
    hasData:false,
    noData: Img_URL + 'img_empty.png'
  },
  // 切换tanb
  menuClick: function (e) {
    console.log(e)
    this.setData({
      _num: e.target.dataset.num
    })
  },
  findOrder: function () {
    wx.navigateTo({
      url: "/pages/mine/mineOrder/findOrder/findOrder"
    })
  },
})