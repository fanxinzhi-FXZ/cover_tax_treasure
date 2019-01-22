const util = {

  /*
  说明： toast方法封装
  */
  toast: function (title, icon, duration) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration || 2000
    })
  },
  /**
  *说明： 确认框方法封装
  */
  confirmFrame: function (content, confirmText, cancelText, success, fail) {
    wx.showModal({
      title: '亲爱的用户',
      content: content,
      confirmText: confirmText,
      cancelText: cancelText,
      success: function (res) {
        if (res.confirm) {
          success()
        }
        if (res.cancel) {
          fail()
        }
      }
    })
  },

  /**
   * 说明： 当前时间/时间戳 转年月日
   */
  formatTime: function (date, number) {
    var year = date.getFullYear() + (number ? number : 0);
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return [year, month, day].map(util.formatNumber).join('-')
  },
  /**
   * 说明： 时间个位数时补位
  */
  formatNumber: function (n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  }
}

module.exports = util;