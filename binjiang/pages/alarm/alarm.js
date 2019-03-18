var dateTimePicker = require('./pack.js');
Page({
  data: {
    array: ['全部','控制柜', '单灯'],
    index: 0,
    alarmtype: ['全部', '灯具故障','通信故障','电源故障'],
    typeindex: 0,
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    condition: false,
    devicename:'',
    devicetype:0,
    alarmselect:0,
    starttime:false,
    endtime:false,
    qitime:'',
    zhitime:'',
    warnContent:'',
    i:1,
    j:1,
  },
  onLoad() {
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTime1: obj.dateTime,
      dateTimeArray1: obj.dateTimeArray,
    });
    this.alarmlistfun()
  },
  alarmlistfun: function () {
    var This = this
    wx.request({
      url: 'https://wechat.insigmaunited.com/warn/search?from=wechat',
      data: {
        token: wx.getStorageSync('token'),
        userName: wx.getStorageSync('userName'),
        startDate: this.data.qitime,
        endDate: this.data.zhitime,
        status: -1,
        pageNum: 1,
        pageSize: 10,
        warnType: this.data.alarmselect,
        clientType: this.data.devicetype,
        clientName: this.data.devicename
      },
      success: function (res) {
        This.setData({
          alarmlists: res.data.data.list
        })
        console.log(res)
      }
    })
  },
  alarmsearch:function(e){
      var This = this
      wx.request({
        url: 'https://wechat.insigmaunited.com/warn/search?from=wechat',
        data: {
          token: wx.getStorageSync('token'),
          userName: wx.getStorageSync('userName'),
          startDate: this.data.qitime,
          endDate: this.data.zhitime,
          status: -1,
          pageNum: 1,
          pageSize: 10,
          warnType: this.data.alarmselect,
          clientType: this.data.devicetype,
          clientName: this.data.devicename
        },
        success: function (res) {
          This.setData({
            alarmlists: res.data.data.list
          })
          console.log(This.data.qitime, This.data.zhitime)
        }
      })
  },
  inputsearch:function(e){
    this.setData({
      devicename: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        alarmtype: ['全部', '灯具故障', '通信故障', '电源故障'],
        typeindex: 0,
        devicetype: 0
      })
    }
    else if (e.detail.value == 1) {
      this.setData({ 
        alarmtype: ['通信故障'],
        typeindex: 0,
        devicetype:1
      })
    }
    else if (e.detail.value == 2) {
      this.setData({
        alarmtype: ['全部', '灯具故障', '通信故障', '电源故障'],
        typeindex: 0,
        devicetype: 2
      })
    }
    this.setData({
      index: e.detail.value
    })
  },
  bindalarmChange: function (e) {
    this.setData({
      typeindex: e.detail.value
    })
    if (this.data.devicetype==0){
      if (e.detail.value==0){
        this.setData({
          alarmselect: 0
        }) 
      }
      else if (e.detail.value == 1){
        this.setData({
          alarmselect: 13
        })
      }
      else if (e.detail.value == 2) {
        this.setData({
          alarmselect: 20
        })
      }
      else if (e.detail.value == 3) {
        this.setData({
          alarmselect: 17
        })
      }
    }
    else if (this.data.devicetype == 1) {
        this.setData({
          alarmselect: 1
        })
    }
    else if (this.data.devicetype == 2) {
      
      if (e.detail.value == 0) {
        this.setData({
          alarmselect: 0
        })
      }
      else if (e.detail.value == 1) {
        this.setData({
          alarmselect: 13
        })
      }
      else if (e.detail.value == 2) {
        this.setData({
          alarmselect: 14
        })
      }
      else if (e.detail.value == 3) {
        this.setData({
          alarmselect: 17
        })
      }
    }
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value, endtime: true, zhitime: this.data.dateTimeArray[0][this.data.dateTime[0]] + '-' + this.data.dateTimeArray[1][this.data.dateTime[1]] + '-' + this.data.dateTimeArray[2][this.data.dateTime[2]] + ' ' + this.data.dateTimeArray[3][this.data.dateTime[3]] + ':' + this.data.dateTimeArray[4][this.data.dateTime[4]] });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value, starttime: true, qitime: this.data.dateTimeArray1[0][this.data.dateTime1[0]] + '-' + this.data.dateTimeArray1[1][this.data.dateTime1[1]] + '-' + this.data.dateTimeArray1[2][this.data.dateTime1[2]] + ' ' + this.data.dateTimeArray1[3][this.data.dateTime1[3]] + ':' + this.data.dateTimeArray1[4][this.data.dateTime1[4]] });  
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  
  close: function (e) {
    this.setData({
      condition: false
    });
  },
  open: function (e) {
    var This = this
    wx.showModal({
      content: '故障原因：' + e.target.dataset.content,
      success: function (res) {
        if (res.confirm) {
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onReachBottom() {
    wx.showNavigationBarLoading()
    setTimeout(function () {
      // complete
    wx.hideNavigationBarLoading() //完成停止加载
    }, 1500);
  },
  scrolltolower: function () {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        i: this.data.i + 1
      })
      var This = this
    wx.request({
      url: 'https://wechat.insigmaunited.com/warn/search?from=wechat',
      data: {
        token: wx.getStorageSync('token'),
        userName: wx.getStorageSync('userName'),
        startDate: this.data.qitime,
        endDate: this.data.zhitime,
        status: -1,
        pageNum: 1,
        pageSize: this.data.i * 10,
        warnType: this.data.alarmselect,
        clientType: this.data.devicetype,
        clientName: this.data.devicename
      },
    success: function (res) {
        This.setData({
          alarmlists: res.data.data.list
        })
        wx.hideLoading()
      }
    })
  },
})