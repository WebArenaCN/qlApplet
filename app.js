//app.js
App({
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  onShow:function(){
    var token = wx.getStorageSync('token');
    if (token) {
      wx.redirectTo({
        url: 'pages/index/index',
      })
    } else {
      console.log(111)
      wx.redirectTo({
        url: 'pages/reg/reg',
      })
    }
  },
  onLaunch:function(){
  
  }
})
