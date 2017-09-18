//index.js
//获取应用实例
var app = getApp()
var latitude, longitude, userInfo,bikeArr,markers;
//经纬度参数
Page({
  data: {
    runhidden:true,
    scale:19,
    latitude:0,
    longitude:0,
    showModalStatus: false,
    showReg:true,
    circles:[],
    
  },

  
 onReady:function(e){
   this.mapCtx = wx.createMapContext('mymap')
 },

  onLoad: function (options) {
  
   this.timer=options.timer;
   var that=this;
    // 获取当前经纬度
    wx.getLocation({
      type: 'gcj02',
      success:(res)=>{
       let  latitude = res.latitude
       let longitude = res.longitude;
       let marker = this.createMarker(res);
       wx.setStorageSync('lng',longitude);
       wx.setStorageSync('lat', latitude);
     //  console.log(latitude+','+longitude);
       var markers=[];
       markers.push(marker);


      
       wx.getStorage({
         key: 'token',
         success: function(res) {
       // console.log(res.data);
           var url = "https://www.qinglibike.com/qlbike/bike/list/" + longitude + "/" + latitude + "/" + "0.007" + "/" + res.data;
           wx.request({
             method: 'GET',
             url: url,
             header: {
               'Content-Type': 'application/json'
             },
             success: function (res) {
            //  console.log(res)
               if (res.data.status == 200) {
                
                 var bikeArr=res.data.data;
             //  console.log(bikeArr)
                   for (var item in bikeArr) {

                     if (bikeArr[item].bikealert!= 0){
                       var marker = {
                         iconPath: '/images/bike_hb.png',
                         id: bikeArr[item].bikeid || 0,
                         latitude: bikeArr[item].bikelat,
                         longitude: bikeArr[item].bikelng,
                         width:35,
                         height:35
                       };
                     }else{
                       var marker = {
                         iconPath: '/images/bike_normal.png',
                         id: bikeArr[item].bikeid || 0,
                         latitude: bikeArr[item].bikelat,
                         longitude: bikeArr[item].bikelng,
                         width:35,
                         height:35
                       };
                     }
                    
               //   var marker =that.createrMarker(bikeArr[item]);
                     markers.push(marker);
                  
                   };
                   that.setData({
                     markers:markers
                   })
                  
                

                  
               }else{
                 var cont=String(res.data.msg);
                 wx.showModal({
                   title: '提示',
                   content: cont,
                   showCancel:false,
                   success:function(res){
                          // wx.redirectTo({
                          //   url: '../reg/reg',
                          // })
                   },
                   fail:function(res){

                   }
                 })
               }

             },
             fail: function (res) {
               
             }

           })
         },
         fail:function( ){
           wx.showModal({
             title: '提示',
             content: '用户未登录',
             showCancel: false,
             success: function (res) {
               if (res.confirm) {
                 wx.navigateTo({
                   url: '../reg/reg',
                 });
               } else if (res.cancel) {
                 console.log('用户点击取消')
               }
             }
           })
         }
       })
         
    
     

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,

        });
        
      },
     
    });
   
    wx.getSystemInfo({

      success:(res)=>{
       
        this.setData({
          controls:[{
            id:1,
            iconPath:"/images/focus.png",
            position:{
              left:10,
              top:res.windowHeight-75,
              width:55,
              height:55
            },
            clickable:true
          }, {
            id: 2,
            iconPath: "/images/scanma.png",
            position: {
              left: res.windowWidth / 2 - 80,
              top: res.windowHeight - 120,
              width:160,
              height:45
            },
            clickable: true
          },{
            id:3,
            iconPath:"/images/user.png",
            position:{
              left:res.windowWidth-53,
              top:res.windowHeight-65,
              width:37,
              height:37
            },
            clickable:true
         },
          // {
          //   id: 4,
          //   iconPath: "/images/wallet.png",
          //   position: {
          //     left: res.windowWidth - 53,
          //     top: res.windowHeight - 110,
          //     width:40,
          //     height:40
          //   },
          //   clickable: true
          // },
          ]
        })
      },
    });
  
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(e){
      //更新数据
      that.setData({
        userInfo:e
      })
      // console.log(that)
    })
  },

  // 控件处理程序
  controltap(e) {
  
    // 二维码控件处理
    if(e.controlId== 1){
     
      this.moveTo();
   
     
    };
      if (e.controlId == 2){
        
       
        wx.scanCode({
          success: (res) => {
            var bike_num=String(res.result).split('=')[1];
            //console.log(bike_num);
           
                wx.removeStorageSync('bikeId');
                wx.setStorageSync('bikeId',bike_num);
                wx.redirectTo({
                
                  url: '../run/run',
                })
            
              
              
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
       
       wx.getStorage({
         key: 'token',
         success: function(res) {
            // console.log(res);
            wx.navigateTo({
              url: '../you/you'
            })
         },
         fail:function(){
           wx.showModal({
             title: '提示',
             content: '请先登录',
             showCancel: false,
             success:function(res){
               if(res.confirm){
                 wx.navigateTo({
                   url: '../reg/reg'
                 })
               }
             }
           })
         }
       })
      
        
       
      }
  },
  //移动视野
  moveTo:function(e){
   
     this.mapCtx.moveToLocation();
  },
  //中心

  
  getCenterLocation: function (){
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
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
  },

  createMarker(point){
  let latitude=point.latitude;
  let longitude=point.longitude;
 
  if(point.bikeid==undefined){
    var marker = {
      iconPath: '/images/marker.png',
      id: point.bikeid || 0,
      latitude: latitude,
      longitude: longitude,
      width:15,
      height:35
    };
   
  }else{
    var marker = {
      iconPath: '/images/bike_normal.png',
      id: point.bikeid || 0,
      latitude: latitude,
      longitude: longitude,
      width: 30,
      height: 30
    };
  }
 
  return marker;
  },

  onShareAppMessage: function () {

    return {

      title: '轻力单车小程序',

      desc: '共享单车',

      path: '/pages/index/index'

    }

  }
})
