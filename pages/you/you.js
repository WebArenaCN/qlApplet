//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userPhone:'',
    credit_score: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
  console.log('点击头像')
  },
  onLoad: function () {
    this.pay();
    var phone=this.hidePhone(this.data.userPhone);
    this.setData({
      userPhone:phone,
    })
    this.getUserBikeinfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //单独方法

//1.隐藏手机号
hidePhone(phone){
  return String(phone).substr(0,3)+'****'+String(phone).substr(7);
},
  onShareAppMessage: function (res) {
   // console.log(res.from);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getUserBikeinfo(){
    var that = this;
    var bike_nowTime = Date.parse(new Date()) / 1000;
    // console.log(bike_startTime);
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        var url = "https://www.qinglibike.com/qlbike/user/token/" + token;
        wx.request({
          method: "GET",
          url: url,
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
           
        if(res.data.status==200){
          
         that.setData({
           credit_score: res.data.data.userscore,
           userPhone:that.hidePhone(res.data.data.userphone),
         })
            

          
        }else{
          
        }
          },
          fail: function (res) {

          },
        });

      },
      fail: function () {

      }
    })
  },
  //注销
  clearStorage: function () {
    wx.showModal({
      title: '提示',
      content: '确定要注销么?',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              wx.removeStorage({
                key: 'userPhone',
                success: function (res) {
                  wx.showToast({
                    title: '注销成功',
                    icon: "success",
                    duration: 1000,
                    success: function () {
                      wx.navigateTo({
                        url: '../reg/reg',
                      })
                    }
                  })
                },
              })

            }
          })



        } else if(res.cancel) {
          
        }

      }
    })

  },
  pay(){
   
  }
})
