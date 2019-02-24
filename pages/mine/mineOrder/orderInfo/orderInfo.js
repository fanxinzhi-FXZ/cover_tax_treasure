const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
const mine = require('../../../../server/mine.js');
Page({
  data: {
    sucImg: Img_URL + 'icon_clocse4.png',
    order_status:1,
    orderID:"",
    infoData:{},
    time:""
  },
  onLoad(e){
    console.log(e.id)
    this.setData({
      orderID: e.id
    })
    this.init(e.id)
  },
  init(id){
    var that = this;
    var token = wx.getStorageSync('TOKEN');
    var params = {
      token: token,
      order_id:id
    }
    mine.mineOrderInfo(params, function (data) {
      console.log(data)
      // 设置数据
      that.setData({
        infoData: data
      })
    })
  }
})