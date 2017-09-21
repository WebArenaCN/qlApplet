//recharge.js
var app = getApp()
var color,sucmoney
var money = 0
var b = 0
var yajinid = 0
Page({
  data: {
    mymoney: 0,
    disabled: false,
    curNav: 1,
    curIndex: 0,
    cart: [],
    cartTotal: 0,
    showClearBtn:true,
    lockhidden: true,
    yajinhidden: true,
    sucmoney:0,
    color: "limegreen",
    nocancel: false,
    tajinmodaltitle: "成为VIP",
    yajinmodaltxt: "去充值",
    yajinmoney: 0,
    yajintxt: "您是否确定充值299元？成为我们的VIP用户，永久免费骑行",
      navList: [{
        id: 1,
        chongzhi: '￥2',
        song: '0',
        money: "2"
      },
      {
        id: 2,
        chongzhi: '￥5',
        song: '0',
        money: "5"
      },
      {
        id: 3,
        chongzhi: '￥10',
        song: '0',
        money: "10"
      },
      {
        id: 4,
        chongzhi: '￥20',
        song: '',
        money: "20"
      },
      {
        id: 5,
        chongzhi: 'VIP免费骑行',
        song: '0',
        money: "299"
      }
    ],
  },
  //充值金额分类渲染模块
  selectNav(event) {
    let id = event.target.dataset.id,
    index = parseInt(event.target.dataset.index);
    b = parseInt(event.target.dataset.money);
    self = this;
    this.setData({
      curNav: id,
      curIndex: index,
    })
  },
 
  //页面加载模块
  onLoad: function () {
    var that=this;
   if(wx.getStorageSync('vicLogin')=='success'){
     this.getUserBikeinfo();
     this.setData({
       showClearBtn:false,
     })
   }else{
     
   }
    b = 0;
    this.setData({
      mymoney: money,
    })
   wx.getStorage({
     key: 'token',
     success: function(res) {

     },
   })
  }, 
  buttonEventHandle:function(event){
  },
  //去充值功能模块
  goblance:function(event) {
    money += b;
    this.setData({
      lockhidden: false,
      mymoney: money,
      sucmoney: b,
    })
  },
  confirm: function () {
    this.setData({
      lockhidden: true
    });
  },

  
  //押金功能模块
  yajin:function(event) {
    this.setData({
      yajinhidden: false
    });
  },
  yajincancel:function(event) {
    this.setData({
      yajinhidden: true
    });    
  },
  yajinconfirm:function(event) {
    if(yajinid == 0){
      yajinid = 1;
      this.setData({
        yajinhidden:false,
        nocancel: true,
        lockhidden:true,
        yajintxt: "您已成功成为VIP用户",
        tajinmodaltitle: "充值成功",
        yajinmodaltxt: "完成"
      });    
    } else {
      yajinid = 0;
      this.setData({
        lockhidden: true,
        nocancel: false,
        yajinhidden: false,
        yajinmoney: 299
      });
    }
    this.setData({
      nocancel: true,
    });   
  },


  getUserBikeinfo() {
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
console.log(res);
              that.setData({
                mymoney:res.data.data.usermoney,
               
              })



            } else {
             
            }
          },
          fail: function (res) {

          },
        });

      },
      fail: function () {

      }
    })
  }
})
