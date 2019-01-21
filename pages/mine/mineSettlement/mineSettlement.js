// index.js
const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
Page({
  data: {
    has:true,
    now: Img_URL + 'shenghe1.png',
    end: Img_URL + 'shenghe2.png',
  },
  applyfor(){
    wx.navigateTo({
      url: "/pages/mine/mineSettlement/applyfor/applyfor"
    })
  },
  goHasInfo(){
    wx.navigateTo({
      url: "/pages/mine/mineSettlement/settleInfo/settleinfo"
    })
  }
 
})
