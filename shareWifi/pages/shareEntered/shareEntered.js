// pages/shareEntered/shareEntered.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wifiName: '',
    wifiPw: '',
    wifiId: ''
  },
  connectWiFi: function() {
    wx.getSystemInfo({
      success: (res) => {
        //console.log(res);
        //console.log(res.platform);
        //console.log(typeof(res.platform));
        if (res.platform === 'android') {
          wx.startWifi({
            success: (res) => {
              //console.log(res);
              //console.log(this.data.ssid);
              //console.log(this.data.password);
              wx.showLoading({
                title: '连接中',
              })
              wx.connectWifi({
                SSID: this.data.wifiName,
                password: this.data.wifiPw,
                success: (res) => {
                  //console.log(res)
                  wx.getConnectedWifi({
                    success: () => {
                      //wx.hideLoading();
                      wx.showToast({
                        title: '连接成功',
                        icon: 'success',
                        duration: 2000
                      })
                      getApp().globalData.ssid = this.data.wifiName;
                      getApp().globalData.pw = this.data.wifiPw;
                      wx.redirectTo({
                        url: '../shareResult/shareResult?wifiId=' + this.data.wifiId
                      })
                    },
                    fail: (res) => {
                      //console.log(res);
                      if (res.errCode === 12006) {
                        wx.showToast({
                          title: '请先打开GPS定位开关',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                  })
                },
                fail: (res) => {
                  // console.log(res.errCode);
                  // console.log(typeof(res.errCode));
                  // console.log(res);
                  if (res.errCode === 12005) {
                    wx.showToast({
                      title: '请先打开WiFi开关',
                      icon: 'none',
                      duration: 2000
                    })
                  } else if (res.errCode === 12006) {
                    wx.showToast({
                      title: '请先打开GPS定位开关',
                      icon: 'none',
                      duration: 2000
                    })
                  } else {
                    wx.showToast({
                      title: '连接失败',
                      icon: 'none',
                      duration: 2000
                    })
                    wx.redirectTo({
                      url: '../shareResult/shareResult?wifiId=' + this.data.wifiId
                    })
                  }
                }
              })
            },
            fail: (res) => {
              //console.log(res);
            }
          })
        } else if (res.platform === 'ios' && (parseInt(res.system.substr(4))) >= 11) {
          wx.startWifi({
            success: (res) => {
              //console.log(res);
              wx.connectWifi({
                SSID: this.data.wifiName,
                password: this.data.wifiPw,
                success: (res) => {
                  wx.showLoading({
                    title: '连接中',
                  })
                  //console.log(res);
                  wx.getConnectedWifi({
                    success: () => {
                      //wx.hideLoading();
                      wx.showToast({
                        title: '连接成功',
                        icon: 'success',
                        duration: 2000
                      })
                      getApp().globalData.ssid = this.data.wifiName;
                      getApp().globalData.pw = this.data.wifiPw;
                      wx.redirectTo({
                        url: '../shareResult/shareResult?wifiId=' + this.data.wifiId
                      })
                    },
                    fail: () => {
                      wx.showToast({
                        title: '连接失败',
                        icon: 'none',
                        duration: 2000
                      })
                      wx.redirectTo({
                        url: '../shareResult/shareResult?wifiId=' + this.data.wifiId
                      })
                    }
                  })
                },
                fail: (res) => {
                  //console.log(res);
                }
              })
            }
          })
        } else if (res.platform === 'ios' && (parseInt(res.system.substr(4))) < 11) {
          wx.showToast({
            title: '请升级到ios11或以上版本',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })










  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(options.wifiId);
    this.data.wifiName = options.wifiName;
    this.setData({
      wifiName: this.data.wifiName
    });
    this.data.wifiPw = options.wifiPw;
    this.setData({
      wifiPw: this.data.wifiPw
    });
    this.data.wifiId = options.wifiId;
    this.setData({
      wifiId: this.data.wifiId
    });
    //console.log(this.data.wifiId);
    //console.log(typeof(this.data.wifiId));
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