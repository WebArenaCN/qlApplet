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



//需要改为token
    // wx.getStorage({
    //   key: 'userPhone',
    //   success: function(res) {

    //      wx.redirectTo({
    //       url: 'pages/index/index',
    //     })
    //   },
    //   fail:function(res){
    //     console.log(res)
    //     wx.redirectTo({
    //       url: 'pages/reg/reg',
    //     })
    //   }
    // })
   
  },
  onLaunch:function(){
  
  }
})
