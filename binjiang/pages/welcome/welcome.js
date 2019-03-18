// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    energySavingRate:'',
    lightRate:'',
    alarmnum:'',
    pingjia:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var day1 = new Date(); day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
    var This=this
    wx.request({
      url: 'https://wechat.insigmaunited.com/statistics/oneDayStatistics?from=wechat',
      data: {
        token: wx.getStorageSync('token'),
        userName: wx.getStorageSync('userName'),
        statisticsDate:s1
      },
      success: function (res) {
        console.log(res)
        This.setData({
          energySavingRate: res.data.data.energySavingRate,
          lightRate: res.data.data.lightRate
        })
      }
    }) 
    wx.request({
      url: 'https://wechat.insigmaunited.com/warn/untreatedWarnNum?from=wechat',
      data: {
        token: wx.getStorageSync('token'),
        userName: wx.getStorageSync('userName')
      },
      success: function (res) {
        console.log(res)
        This.setData({
          alarmnum: res.data.data.total
        })
        if (This.data.alarmnumber <= 10 ||This.energySavingRate) {
          This.setData({
            pingjia: '良好'
          })
        }
        else if (This.data.alarmnumber > 10 && This.alarmnumber <= 30) {
          This.setData({
            pingjia: '及格'
          })
        }
        if (This.data.alarmnumber > 30 || This.data.energySavingRate <= 63.5 || This.data.lightRate<=98.5) {
          This.setData({
            pingjia: '较差'
          })
        }
      }
    }) 
  }
})