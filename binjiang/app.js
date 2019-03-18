App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据  
    // var logs = wx.getStorageSync('logs') || []  
    // logs.unshift(Date.now())  
    // wx.setStorageSync('logs', logs) 

    //调用登录接口
    console.log(wx.getStorageSync('token'))
    if (wx.getStorageSync('token')!=null){
      wx.navigateTo({
        //传递参数方式向get请求拼接参数一样
        url: "/pages/welcome/welcome",
        success: function (res) {
          console.log(res)
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }

  }
}) 