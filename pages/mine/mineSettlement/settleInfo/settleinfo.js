const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
const mine = require('../../../../server/mine.js');
Page({
  data: {
    one: Img_URL +'icon_1_select.png',
    two: Img_URL + 'icon_2.png',
    two_select: Img_URL + 'icon_2_select.png',
    bannerImg: Img_URL + 'img_dispose.png',
    settleID:'',
    status:1
  },
  onLoad(e){
    console.log(e.id)
    this.setData({
      settleID: e.id
    })
    this.init(e.id)
  },
  init(id){
    var that = this;
    var token = wx.getStorageSync('TOKEN');
    var params = {
      token: token,
      id: id
    }
    mine.claim_settlement_detail(params, function (data) {
      console.log(data)
      // 设置数据
      that.setData({
        status: data.status
      })
    })
  }
})