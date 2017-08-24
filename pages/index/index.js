//index.js
//获取应用实例
var app = getApp()
var latitude, longitude,userInfo;
//经纬度参数
Page({
  data: {
    latitude:22.543099,
    longitude:114.057868,
    lockhidden: true,
    markers: [{
      //摩拜单车的位置
        iconPath: "../../images/bike_normal.png",
        id: 1,
        latitude:34.7468,
        longitude:113.625368,
        width:40,
        height:50
      },
      {
        //摩拜单车的位置
        iconPath: "../../images/bike_normal.png",
        id: 2,
        latitude: 34.7472,
        longitude: 113.625370,
        width: 40,
        height: 50
      },{
      // 我的位置
        iconPath: "../../images/myloc.png",
        id:0,
        latitude:latitude,
        longitude:longitude,
        width:40,
        height:50
     }],
     //控件
    controls: [{
      // 我的位置控件
      id: 0,
      iconPath: "../../images/imgs_main_location@2x.png",
      position: {
        left: 10,
        top: 590,
        width: 50,
        height: 50
      },
      clickable: true
    }, {
      // 红包控件
      id: 1,
      iconPath: "../../images/hongbao.png",
      position: {
        left: 350,
        top: 525,
        width: 50,
        height: 50
      },
      clickable: true
      }, {
        // 充值控件
        id: 2,
        iconPath: "../../images/chongzhi.png",
        position: {
          left: 350,
          top: 590,
          width: 50,
          height: 50
        },
        clickable: true
    }, {
      //二维码控件
      id: 3,
      iconPath: "../../images/lock.png",
      position: {
        left:100,
        top: 580,
        width:120,
        height:60
      },
      clickable: true
    }]
  },
  onLoad: function () {
    var that = this;
    // 获取当前经纬度
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        latitude = res.latitude
        longitude = res.longitude
        console.log(latitude+','+longitude)
        that.setData({
          latitude: latitude,
          longitude: longitude
        });
        
      },
      fail:function(e){
        console.log(e)
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(e){
      //更新数据
      that.setData({
        userInfo:e
      })
      console.log(that)
    })
  },
  // 控件处理程序
  controltap(e) {
    // 二维码控件处理
      if (e.controlId == 3){
        wx.scanCode({
          success: (res) => {
          },
          fail: (res) => {
            this.setData({
              lockhidden: false
            });
          }
        })
      };
    //红包控件处理
      if(e.controlId == 1) {
        wx.navigateTo({
          url: '../hongbao/hongbao'
        })
      };
    //充值控件处理
      if (e.controlId == 2) {
        wx.navigateTo({
          url: '../recharge/recharge'
        })
      }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 扫码开锁弹出层显示隐藏
  confirm: function () {
    this.setData({
      lockhidden: true
    });
  }
})
