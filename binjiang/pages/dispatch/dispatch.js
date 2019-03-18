Page({
  data: {
    active: 1
  },
  activejs: function (e) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    if (e.currentTarget.dataset.active==1){
    //this.animation = animation

    animation.translateX(0).step()
    this.setData({
      active: e.target.dataset.active,
      animationData: animation.export()
    })
    }
    else if (e.currentTarget.dataset.active==2){
      //this.animation = animation
      animation.translateX(-wx.getSystemInfoSync().windowWidth).step()
      this.setData({
        active: e.target.dataset.active,
        animationData: animation.export()
      })
    }
  },

}) 