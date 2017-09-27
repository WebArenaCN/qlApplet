// pages/over/over.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rideTime: '',
    pay: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkUseOver();
  },

  goHome:function(){
    wx.redirectTo({
      url: '../index/index',
    })
  },


  //计算费用
  checkUseOver() {
    var that = this;
    var bike_nowTime = Date.parse(new Date()) / 1000;
    // console.log(bike_startTime);
    wx.getStorage({
      key: 'token',
      success: function (res) {
        var token = res.data;
        var url = "https://www.qinglibike.com/qlbike/user/finish/" + token;
        wx.request({
          method: "GET",
          url: url,
          header: {
            "Content-Type": "application/json"
          },
          success: function (res) {
           // console.log(res);
            if (res.data.status == 200) {
              var time = res.data.data.useDurationStr;
              var payment = res.data.data.tradeTurnover;
            //  console.log(time + "/" + payment);
              if (payment == '-600091') {
                that.setData({
                  rideTime: time,
                  pay: '超短用车免费'
                })
              }
              else if (payment == '-600089') {
                that.setData({
                  rideTime: time,
                  pay: 'VIP用车免费'
                })
              }

              else {
                that.setData({
                  rideTime: time,
                  pay: Math.abs(payment) / 100
                })
              }



         

          }


        },
          fail: function (res) {

          },
        });

  },
  fail: function () {
    wx.showModal({
      title: '提示',
      content: '',

    })
  }
})
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

}
})