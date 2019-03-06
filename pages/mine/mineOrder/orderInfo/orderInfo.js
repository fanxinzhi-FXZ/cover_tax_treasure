const Img_URL = 'https://www.beishuibao.com/web_pic/program/';
const mine = require('../../../../server/mine.js');
Page({
  data: {
    sucImg: Img_URL + 'icon_clocse4.png',
    failimg: Img_URL + 'icon_eliminate.png',
    order_status:1,
    orderID:"",
    infoData:{},
    time:"",
    hour: "00",
    min: "00",
    second: "00"
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
      that.countDown(that, data.expire_time)
    })
  },
  countDown: function (vm, timestamp) {

    var nowTime = function () {

      var totalSecond = parseInt(timestamp) - Date.parse(new Date()) / 1000;
      
      if (totalSecond > 0){
        var second = totalSecond;

        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();

        var hr = Math.floor((second - day * 3600 * 24) / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;

        var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        vm.setData({
          hour: hrStr,
          min: minStr,
          second: secStr
        });
        totalSecond--;
      }else {
          clearInterval(timer);
          vm.setData({
            hour: "00",
            min: "00",
            second: "00"
          });
      }
    };

    nowTime();
    var timer = setInterval(nowTime, 1000);

  }
})