// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usename:null,
    password:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  },
  login:function(){
    wx.request({
      url: 'https://wechat.insigmaunited.com/user/login?from=wechat',
      data: {
        userName: this.data.usename,
        password: this.data.password
      },
      success: function (res) {
        console.log(res)
        if(res.data.success==true){
          console.log(res)
          wx.setStorageSync('token', res.data.data.token)
          wx.setStorageSync('userName', res.data.data.userName)
          wx.navigateTo({
            //传递参数方式向get请求拼接参数一样
            url: "../welcome/welcome",
            success: function (res) {
              console.log(res)
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
        else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1000
          })
        }
      }
    }) 
  },
  watchname:function(e){
    this.setData({
      usename: e.detail.value
    })
  },
  watchpassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  }
})