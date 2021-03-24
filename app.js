const {
  baseUrl
} = require('./api/env').dev
var base64 = require('./api/base64');
const event = require("./utils/event.js");
App({
  onLaunch: function () {
    // this.getSetting();
    this.checkSystem()
  },
  globalData: {
    userInfo: null,
    systemInfo: {},
    isIphoneX: false
  },
  // 获取设置
  getSetting() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res, 'resresres')
        if (res.errMsg == "getSetting:ok") {
          wx.login({
            success: res => {
              let code = res.code
              wx.request({
                url: baseUrl + 'skledu-auth/social/token?type=MINI&grant_type=social&scope=all&code=' + code,
                method: 'post',
                header: {
                  'Tenant-Id': "842288",
                  'User-Type': "mini",
                  "Authorization": "Basic " + base64.encode("PS:PS_SECRET"),
                  "Content-Type": "application/json;charset=UTF-8"
                },
                success: res => {
                  wx.setStorageSync('userId', res.data.user_id)
                  wx.setStorageSync('access_token', res.data.access_token)
                  wx.setStorageSync('openId', res.data.account)
                  this.getUserInfo()
                },
                fail: res => {
                  console.log('fail获取openId', res)
                }
              })
            }
          })
          if (res.authSetting['scope.userInfo']) {
            console.log('已经授权，可以直接调用 getUserInfo 获取头像昵称')
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
          // 获取数据库用户数据
          if (wx.getStorageSync('userId') && wx.getStorageSync('access_token') && wx.getStorageSync('openId')) {
            this.getUserInfo()
          }
        }
      }
    })
  },
  // 检测系统
  checkSystem() {
    let systemInfo = wx.getSystemInfoSync();
    this.globalData.systemInfo = systemInfo;

    this.globalData.StatusBar = systemInfo.statusBarHeight; // 状态栏的高度
    let custom = wx.getMenuButtonBoundingClientRect();//胶囊信息
    this.globalData.Custom = custom;  
    this.globalData.CustomBar = custom.bottom + custom.top - systemInfo.statusBarHeight;//CustomBar高度

    // 判断费否为iphone10+
    let modelmes = systemInfo.model;//手机类型
    if (modelmes.search('iPhone X') != -1 || modelmes.search('iPhone 11') != -1 || modelmes.search('iPhone 11 Pro Max') != -1) {
      this.globalData.isIphoneX = true;
    }
  },
  // 获取userInfo
  getUserInfo() {
    wx.request({
      url: baseUrl + 'skledu-member/info',
      method: 'get',
      header: {
        'Skledu-Auth': "bearer " + wx.getStorageSync('access_token'),
        'Content-Type': "application/x-www-form-urlencoded"
      },
      success: res => {
        if (res.data.code == 200) {
          let data = res.data.data
          let date = {
            avatar: data.avatar,
            province: data.province,
            provinceId: data.provinceId,
            city: data.city,
            cityId: data.cityId,
            district: data.district,
            districtId: data.districtId,
            gradeId: data.gradeId,
            realName: data.realName,
          }
          wx.setStorageSync('userInfo', date)
          wx.setStorageSync('phone', data.phone)
        }
      },
      fail: res => {
        console.log('fail1')
      }

    })
  },
  // 获取用户手机号
  getPhoneNumber(params) {
    let e = params.callback.detail
    if (e.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: baseUrl + 'skledu-member/updateMemberPhone?encryptedData=' + encodeURIComponent(base64.encode(e.encryptedData)) + '&iv=' + encodeURIComponent(base64.encode(e.iv)),
        method: "post",
        header: {
          'Skledu-Auth': "bearer " + wx.getStorageSync('access_token')
        },
        success: function (res) {
          if (res.data.code == 200) {
            wx.setStorageSync('phone', res.data.data)
            event.$emit({
              name: "appLogin",
              data: res.data.data
            })
            params.success(res)
          }
        }
      })
      wx.navigateTo({
        url: '/pages/mine/information/information',
      })
    }
  },
})