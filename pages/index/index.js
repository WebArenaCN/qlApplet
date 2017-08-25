//index.js
//获取应用实例
var app = getApp()
var latitude, longitude,userInfo;
//经纬度参数
Page({
  data: {
    scale:18,
    latitude:0,
    longitude:0,
    showModalStatus: false
    // markers: [{
    //   //摩拜单车的位置
    //     iconPath: "../../images/bike_normal.png",
    //     id: 1,
    //     latitude:34.7468,
    //     longitude:113.625368,
    //     width:40,
    //     height:50
    //   },
    //   {
    //     //摩拜单车的位置
    //     iconPath: "../../images/bike_normal.png",
    //     id: 2,
    //     latitude: 34.7472,
    //     longitude: 113.625370,
    //     width: 40,
    //     height: 50
    //   },{
    //   // 我的位置
    //     iconPath: "../../images/myloc.png",
    //     id:4,
    //     latitude:latitude,
    //     longitude:longitude,
    //     width:40,
    //     height:50
    //  }],
    //  //控件
    // controls: [{
    //   // 我的位置控件
    //   id: 0,
    //   iconPath: "../../images/imgs_main_location@2x.png",
    //   position: {
    //     left: 10,
    //     top: 590,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    // }, {
    //   // 红包控件
    //   id: 1,
    //   iconPath: "../../images/hongbao.png",
    //   position: {
    //     left: 350,
    //     top: 525,
    //     width: 50,
    //     height: 50
    //   },
    //   clickable: true
    //   }, {
    //     // 充值控件
    //     id: 2,
    //     iconPath: "../../images/chongzhi.png",
    //     position: {
    //       left: 350,
    //       top: 590,
    //       width: 50,
    //       height: 50
    //     },
    //     clickable: true
    // }, {
    //   //二维码控件
    //   id: 3,
    //   iconPath: "../../images/lock.png",
    //   position: {
    //     left:100,
    //     top: 580,
    //     width:120,
    //     height:60
    //   },
    //   clickable: true
    // }]
  },
  powerDrawer: function (e) {
     var currentStatu = e.currentTarget.dataset.statu;
     this.util(currentStatu)
   
  }, 
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      });

      //关闭 
      if (currentStatu == "close") {
      
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  },
  sayname:function(e){
    var that=this;
  that.setData({
    text:e.detail.value
  })
  },
  reg: function (e) {
  
    console.log(this);
   console.log(this.data.text);
  },
  onLoad: function (options) {
   this.timer=options.timer;
   var that=this;
    // 获取当前经纬度
    wx.getLocation({
      type: 'gcj02',
      success:(res)=>{
        // latitude = res.latitude
        // longitude = res.longitude
        // console.log(latitude+','+longitude)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        
      },
     
    });
    wx.getSystemInfo({

      success:(res)=>{
        console.log(this)
        this.setData({
          controls:[{
            id:1,
            iconPath:"/images/focus.png",
            position:{
              left:10,
              top:res.windowHeight-54,
              width:30,
              height:30
            },
            clickable:true
          }, {
            id: 2,
            iconPath: "/images/scanma.png",
            position: {
              left: res.windowWidth / 2 - 80,
              top: res.windowHeight - 120,
              width:160,
              height:50
            },
            clickable: true
          },{
            id:3,
            iconPath:"/images/user.png",
            position:{
              left:res.windowWidth-50,
              top:res.windowHeight-60,
              width:30,
              height:30
            },
            clickable:true
          },
          {
            id: 4,
            iconPath: "/images/wallet.png",
            position: {
              left: res.windowWidth - 53,
              top: res.windowHeight - 110,
              width:40,
              height:40
            },
            clickable: true
          },
          ]
        })
      },
    });
    var userPhone = wx.getStorageSync('userPhone');
    var token = wx.getStorageSync('token');

    console.log(userPhone);
    console.log(token);
    if (userPhone) {
      this.setData({ userPhone:userPhone});
    }else{
      // wx.showToast({
      //   title: '请输入你的手机号码',
      //   icon:'loading',
      //   duration: 2000,
      //   success:function(){
         
      //   }
      // })
    }
    if (userPassword) {
      this.setData({token:token });
    }
    wx.request({
      url: 'http://www.qinglibike.com/qlbike/servlet/AppRegisterServlet',

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
      if (e.controlId == 2){
        wx.scanCode({
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            this.setData({
              lockhidden: false
            });
          }
        })
      };
    //红包控件处理
      if(e.controlId == 4) {
        wx.navigateTo({
          url: '../hongbao/hongbao'
        })
      };
    //充值控件处理
      if (e.controlId == 3) {
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
