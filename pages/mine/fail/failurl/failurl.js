// pages/mine/fail/failurl/failurl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageurl: '',
    platform: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm = this;
    wx.getSystemInfo({
      success: function (res) {
        if (res.platform == 'ios'){
          vm.setData({
            platform: res.platform,
            pageurl: options.pageurl
          })
        }else {
          wx.downloadFile({
            url: options.pageurl,
            success: function (res) {
              console.log(res)
              var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
              wx.openDocument({
                filePath: Path,
                success: function (res) {
                  console.log('打开成功');
                }
              })
            },
            fail: function (res) {
              console.log(res);
            }
          })
        }
        
        
      }
    })
    
    console.log(options.pageurl)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})