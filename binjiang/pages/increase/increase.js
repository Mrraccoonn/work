// pages/increase/increase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alarmlists:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  alarmlistfun: function () {
    var This = this
    wx.request({
      url: 'https://wechat.insigmaunited.com/warn/search?from=wechat',
      data: {
        token: wx.getStorageSync('token'),
        userName: wx.getStorageSync('userName'),
        startDate: getOldFormatDate(), 
        endDate: getNowFormatDate(), 
        status: -1, 
        pageNum: 1,
        pageSize: 10000,
        warnType: this.warnType3, 
        clientType: this.clientType3, 
        clientName: this.nowequipname
      },
      success: function (res) {
        This.setData({
          alarmlists: res.data.data.list
        })
        console.log(res)
      }
    })
  },
})