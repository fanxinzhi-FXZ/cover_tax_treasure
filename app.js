//app.js
const user = require("/server/user.js")

App({
  onLaunch: function () {
    // 微信注册
    user.checkSession(function(){
      
    })

  }
})
