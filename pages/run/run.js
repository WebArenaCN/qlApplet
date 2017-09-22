var app = getApp()
var latitude, longitude, userInfo, bikeArr, markers;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    runModal_show:false,
    nullHouse: false,
    scale: 18,
    latitude: 0,
    longitude: 0,
    bike_num:'',
    run_distance:'0',
    run_min:'0',
    bikeShow:'',
    bikeShutDown:false,
    usebiketime:'1',
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
    this.checkBikeStatus();
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
         
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        var bikeId=wx.getStorageSync('bikeId');
         that.setData({
           bikeId:bikeId
         })
      },
    });
    this.checkBikeStatus();
  
    if (this.data.usebiketime==0){
     console.log('停车了');
         wx.redirectTo({
           url: '../over/over',
         });
         clearInterval(time1);
    } else if (this.data.usebiketime != 0){
      
    var time1=setInterval(this.checkBikeStatus,1000)
   
   
    }
       
  
   
    let lati = wx.getStorageSync('lat');
    let lng = wx.getStorageSync('lng');
    this.setData({
      latitude: lati,
      longitude: lng,
    });
    
 
   
  },



//中途停车
  midStop:function(e){
    var that=this;
    if(e.detail.value){
      wx.getStorage({
        key: 'token',
        success: function (res) {
          var token = res.data;
          console.log(token);
          var bikeId=wx.getStorageSync('bikeId');
          var url = "https://www.qinglibike.com/qlbike/bike/stopbike/" + bikeId + '/' + token;
          wx.request({
            method: "GET",
            url: url,
            header: {
              "Content-Type": 'application/json'
            },
            success: function (res) {
                 console.log(res);
              if (res.data.status == 200) {
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000
                })

                that.setData({
                  bikeShow: res.data.data,

                })
              }else if (res.data.status == 400){
                var tips = res.data.msg;
                wx.showModal({
                  title: '提示',
                  content: '停车失败',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {

                    
                    }else if(res.cancel){

                    }
                  }
                })
              }
            },
            fail: function (res) {

            }
          })

        },
      })
    };
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
   
  },

  //获取车辆密码
  getBikePwd: function(bikeId){
    var that=this;
    wx.getStorage({
      key: 'token',
      success: function(res) {
        var token =res.data;
        console.log(token);
        var url = "https://www.qinglibike.com/qlbike/bike/pwd/"+bikeId+'/'+token;
        wx.request({
          method:"GET",
          url: url,
          header:{
            "Content-Type":'application/json'
          },
          success:function(res){
          
             if(res.data.status==200){
                 console.log(res.data);
              that.setData({
                   bikeShow: res.data.data,
                 
                 })
             }else{
               var tips=res.data.msg;
               wx.showModal({
                 title: '提示',
                 content:'获取密码失败请稍后重试',
                 showCancel:false,
                 success:function(res){
                   if(res.confirm){
                     
                     console.log('点击了确定');
                     
                   }
                 }
               })
             }
          },
          fail:function(res){

          }
        })

      },
    })
    
  },
  // clickArea: function () {
  //   var that = this; 
  //   this.setData({
  //     nullHouse: false,  //弹窗显示  
  //      });
  // }, 

   //检验自行车状态
  checkBikeStatus(){
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
        
            if (res.data.status == 200) {

              var user_startTime = res.data.data.usebiketime;//用户骑行开始时间
              if (user_startTime == 0) {
                // console.log('骑行结束');
                that.setData({
                    usebiketime:0,
                    
                })

              } else if (user_startTime > 0) {
                
                that.setData({
                  usebiketime: user_startTime
                })
        
                var runTime = Math.round((bike_nowTime - user_startTime) / 60);
                var checkOver = res.data.data.usebiketime;

                console.log(runTime);
                that.setData({
                  run_min: runTime,
                })
          



              }

            
            } else if (res.data.status == 400){
             
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




  
 
  //关闭密码窗口
  closePwdWindow(){
    this.setData({
      mapH:'70%',
      nullHouse:true,
      runModal_show:false
    })
  }


})
