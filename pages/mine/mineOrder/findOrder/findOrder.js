const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
Page({
  data: {
    codeImg: Img_URL +'icon_label1.png'
  },
  seeOrder(){
    wx.navigateTo({
      url: "/pages/mine/mineOrder/orderInfo/orderInfo"
    })
  }
})