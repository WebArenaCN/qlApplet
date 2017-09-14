var app = getApp()
var latitude, longitude, userInfo, bikeArr, markers;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: 18,
    latitude: 0,
    longitude: 0,
    bike_num:'',
    run_distance:'0',
    run_min:'0',
    bikePwd:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let lati = wx.getStorageSync('lat');
    let lng = wx.getStorageSync('lng');
    this.setData({
      latitude: lati,
      longitude: lng,
    });
    
 
   
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var bikeId = wx.getStorageSync('bikeId');
    console.log(bikeId);
    this.getBikePwd(bikeId);
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
             console.log(res);
             if(res.data.status==200){
                 console.log(res.data.data);
                 that.setData({
                   bikePwd:res.data.data
                 })
             }else{
               var tips=res.data.msg;
               wx.showModal({
                 title: '提示',
                 content:tips,
                 showCancel:false,
                 success:function(res){
                   if(res.confirm){
                     console.log('点击了确定');
                     wx.navigateBack({
                       
                     })
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
    
  }
})

