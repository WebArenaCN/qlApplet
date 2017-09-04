// pages/reg/reg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tips:'',
     phone:'',
     yzcode:'',
     successIcon: true,
     failIcon: true,
     res1:'1',
     res2: '2',
      res3: '3'
  },
  Myconfirm:function(){
    this.setData({
      successIcon:true,
    })
  },
  Mycancel: function () {
    this.setData({
       failIcon: true,
    })
  },
  getcodeform:function(e){
    var that=this;
    if(e.detail.value.phone.length==0){
      //  wx.showToast({
      //   title: '手机号不能为空',
      //   icon:'loading',
      //   duration: 1500,
      //   success: function(){

      //    }
      // });
      // wx.showModal({
      //   title: "警告",
      //   content: "咱是不是还得给你钱？！！",
      //   showCancel: false,
      //   confirmText: "不不不不"
      // })
       wx.showModal({
         title: '提示',
         content: '手机号不能为空！！',
         showCancel: false,
         confirmText: "确定"
       });
    }else{
     var phone=e.detail.value.phone;
    
      wx.request({
        url:'https://www.qinglibike.com/qlbike/servlet/AppRegisterServlet?phone='+phone,
        // data:formData,
        method:'POST',
        header:{
          'Content-Type':'application/json' 
           }, 
           success:function(res){
             console.log(res.data.ret);
           that.setData({
             successIcon:true,
           })
         
             if (res.data.ret == 'ok') {
               wx.showModal({
                 title: '提示',
                 content: '发送成功',
                 showCancel: false,
                 confirmText: "确定"
               });
               that.setData({
                 yzcode: 'ok',
                 res1:'ok',
               });
               console.log(that)
             }else{
               wx.showModal({
                 title: '提示',
                 content: '发送失败',
                 showCancel: false,
                 confirmText: "确定"
               });
             }
          
           }

      })
    }
  },
 subform: function (e) {
   var that=this;
    if (e.detail.value.yzcode.length == 0) {
      wx.showModal({
        title: '提示',
        content: '验证码不能为空！！',
        showCancel: false,
        confirmText: "确定"
      });
    }else{
      var yzcode=e.detail.value.yzcode;
      var phone=e.detail.value.phone;
      wx.request({
        url: 'https://www.qinglibike.com/qlbike/user/login?'+'phone='+phone+'&code='+yzcode,
        method:'post',
        
        header: {
          'Content-Type': 'application/json'
        }, 
        success:function(res){
            if(res.data.status=='200'){
              that.setData({
                res2:token
              })
              var token=res.data.data;
              console.log(res)
              wx.setStorageSync('token',token);
              wx.setStorageSync('userPhone',phone);
             
              wx.navigateTo({
                url: '../index/index',
                success:function(){
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 1000,
                    success: function () {
                    }
                  });
                }
              })


          } else {
              that.setData({
                res3: res.data
              })
            console.log(res)
              wx.showModal({
                title: '提示',
                content:'登录失败！！',
                success: function (res) {
                 
                }
              })
          };
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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