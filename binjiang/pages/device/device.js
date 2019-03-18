var dateTimePicker = require('./pack.js');
Page({
  data: {
    array: ['控制柜', '单灯'],
    index: 0,
    condition: false,
    tabledevicebtn:true,
    tablelightbtn:false,
    devicelists:null,
    lightlists:null,
    devicename:'',
    i:1,
    j:1,
  },
  onLoad() { 
    this.devicelistfun()
    this.lightlistfun()
  },
  devicelistfun:function(){
    var This = this
    wx.request({
      url: 'https://wechat.insigmaunited.com/clientControlCabinet/search?from=wechat',
      data: {
        token: wx.getStorageSync('token'),
        userName: wx.getStorageSync('userName'),
        pageNum: 1,
        pageSize: 10,
        clientName: this.data.devicename,
        clientCode: ''
      },
      success: function (res) {
        This.setData({
          devicelists: res.data.data.list
        })
        console.log(res)
      }
    })
  },
  lightlistfun:function(){
    var This = this
    wx.request({
      url: 'https://wechat.insigmaunited.com/clientLamppost/search?from=wechat',
      data: {
        token: wx.getStorageSync('token'),
        userName: wx.getStorageSync('userName'),
        pageNum: 1,
        pageSize: 15,
        clientName: this.data.devicename,
        clientCode: ''
      },
      success: function (res) {
        This.setData({
          lightlists: res.data.data.list
        })
        console.log(res)
      }
    })
  },
  scrolltolower: function () {
    if (this.data.tabledevicebtn == true) {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        i: this.data.i + 1
      })
      var This = this
      wx.request({
        url: 'https://wechat.insigmaunited.com/clientControlCabinet/search?from=wechat',
        data: {
          token: wx.getStorageSync('token'),
          userName: wx.getStorageSync('userName'),
          pageNum: 1,
          pageSize: this.data.i * 10,
          clientName: this.data.devicename,
          clientCode: ''
        },
        success: function (res) {
          This.setData({
            devicelists: res.data.data.list
          })
          wx.hideLoading()
        }
      })

    }
    else {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        j: this.data.j + 1
      })
      var This = this
      wx.request({
        url: 'https://wechat.insigmaunited.com/clientLamppost/search?from=wechat',
        data: {
          token: wx.getStorageSync('token'),
          userName: wx.getStorageSync('userName'),
          pageNum: 1,
          pageSize: this.data.j *15,
          clientName: this.data.devicename,
          clientCode: ''
        },
        success: function (res) {
          This.setData({
            lightlists: res.data.data.list
          })
          wx.hideLoading()
        }
      })
    }
  },
  devicesearch:function(){
    console.log(this.data.tabledevicebtn)
    if (this.data.tabledevicebtn==true){
       this.devicelistfun()
    }
    else{
      this.lightlistfun()
    }
  },
  watchdevicename:function(e){
    this.setData({
      devicename: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      devicename:''
    })
    if (e.detail.value==0){
      this.setData({
      tabledevicebtn:true,
      tablelightbtn:false
      })
    }
    else{
      this.setData({
        tabledevicebtn: false,
        tablelightbtn: true
      })
    }
  },
  onReachBottom() {
    wx.showNavigationBarLoading()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
    }, 1500);
  },
})