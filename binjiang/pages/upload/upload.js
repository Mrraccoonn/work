
Page({
  data: {
    active:1,
    tempFilePaths:''
  },
  activejs: function (e) {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear',
    })

    this.animation = animation

    animation.opacity(0.5).step()
    this.setData({
      active: e.target.dataset.active,
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 10)
  },
  onfo:function(e){
    var _this = this;  
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })
      }
    })
  },
  getnum:function(e){
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
      }
    })
  }
})  