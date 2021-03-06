// pages/shareResult/shareResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiId: '',
    timeoutId: '',
    flag: ''
  },
  goHomePage: function() {
    wx.reLaunch({
      url: '../connectWifi/connectWifi'
    })
    clearTimeout(this.data.timeoutId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.data.wifiId = options.wifiId;
    this.setData({
      wifiId: this.data.wifiId
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.data.timeoutId = setTimeout((id) => {
      wx.reLaunch({
        url: '../webViewPage/webViewPage?id=' + id
      })
    }, 2000, this.data.wifiId)
    this.setData({
      timeoutId: this.data.timeoutId
    });
    wx.startWifi({
      success: (res) => {
        wx.getConnectedWifi({
          success: (res) => {
            this.data.flag = 1;
            this.setData({
              flag: this.data.flag
            });
          },
          fail: () => {
            this.data.flag = 2;
            this.setData({
              flag: this.data.flag
            });
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})