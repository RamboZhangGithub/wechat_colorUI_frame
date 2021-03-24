var QQMapWX = require('./qqmap-wx-jssdk.min.js');
var qqmapsdk;
var { qqmapAccount } = require('../api/env')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 去除特殊符号
const escape2Html = function (str) {
  var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp;nbsp': '　', 'amp': '&', 'quot': '"' };
  return str.replace(/&(lt|gt|nbsp|quot|amp;nbsp);/ig, function (all, t) {
    return arrEntities[t];
  });
}

//深复制
const deep = function (obj) {
  let newObj
  if (obj && typeof obj == 'object') {
    if (Array.isArray(obj)) {
      newObj = []
      obj.map((item) => {
        if (typeof item == 'object') {
          newObj.push(deep(item))
        } else {
          newObj.push(item)
        }
      })
    } else {
      newObj = {}
      for (let key in obj) {
        if (typeof obj[key] == 'object') {
          newObj[key] = deep(obj[key])
        } else {
          newObj[key] = obj[key]
        }
      }
    }
  } else {
    newObj = obj
  }

  return newObj
}

// 等位数组合并
// obj {key:arr,key:arr....}
// key 索引
const arrSContact = (obj) => {
  let param = [];
  obj[Object.keys(obj)[0]].map((el, index) => {
    let item = {}
    for (let k in obj) {
      item[k] = obj[k][index]
    }
    param.push(item)
  })
  return param;
}

// 获取定位
const getPosition = function (param) {
  qqmapsdk = new QQMapWX({
    key: qqmapAccount //这里自己的key秘钥进行填充
  });
  wx.getLocation({
    type: param.encode ? param.encode : 'wgs84', //wgs84返回gps坐标，gcj02返回可用于wx.openLocation的坐标
    success: (res) => {
      /*
      latitude 纬度，浮点数，范围为 - 90~90，负数表示南纬
      longitude 经度，浮点数，范围为 - 180~180，负数表示西经
      speed 速度，浮点数，单位m/s
      accuracy 位置的精确度
      altitude 高度，单位m
      verticalAccuracy 垂直精度，单位m（Android 无法获取，返回0）
      horizontalAccuracy 水平精度，单位 m
      */
      if (param.type = 'city') {
        getCity(param, {
          latitude: res.latitude,
          longitude: res.longitude
        })
      } else {
        param.success(res)
      }
    },
    fail: (err) => {
      param.fail();
    }
  });
}
// 获取城市
const getCity = function (param, locationObj) {
  qqmapsdk.reverseGeocoder({
    location: locationObj,
    success: function (res) {
      param.success(res)
    },
    fail: function (res) {
      param.fail(res)
    },
    complete: function (res) {
    }
  });
}

// 下载文件
const downFile = function (url, success, isopen) {
  wx.showLoading({
    title: '下载中',
  })

  wx.downloadFile({
    url: url,
    success: function (res) {
      var filePath = res.tempFilePath;
      success(res);
      if (isopen) {
        //页面显示加载动画
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            wx.hideLoading()
            console.log('打开文档成功')
          }
        })
      } else {
        wx.hideLoading()
      }
    }
  })
}

// 复制文本
const copyText = function (e, msg) {
  wx.setClipboardData({
    data: e,
    success: function (res) {
      wx.getClipboardData({
        success: function (res) {
          wx.showToast({
            title: msg ? msg : '复制成功'
          })
        }
      })
    }
  })
}

//识别ios
const checkIOS = function () {
  let system = wx.getSystemInfoSync().system;
  let platform = wx.getSystemInfoSync().platform;
  if (/ios/gi.test(system) || platform == "ios") {
    return true
  } else {
    return false
  }
}

// 获取系统默认布局高度
const getLayoutHeight = function () {
  let systemInfo = wx.getSystemInfoSync()
  // px转换到rpx的比例
  let pxToRpxScale = 750 / systemInfo.windowWidth;

  // 状态栏的高度
  let ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale
  // 导航栏的高度
  let navigationHeight = 44 * pxToRpxScale
  // window的宽度
  let ktxWindowWidth = systemInfo.windowWidth * pxToRpxScale
  // window的高度
  let ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale
  // 屏幕的高度
  let ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale
  // 底部tabBar的高度
  let tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight

  return {
    statusBarHeight: ktxStatusHeight,// 状态栏的高度
    windowWidth: ktxWindowWidth,// window的宽度
    windowHeight: ktxWindowHeight,// window的高度
    screenHeight: ktxScreentHeight, // 屏幕的高度
    tabBarHeight: tabBarHeight// 底部tabBar的高度
  }
}

module.exports = {
  formatTime: formatTime,
  getPosition: getPosition,
  arrSContact: arrSContact,
  escape2Html: escape2Html,
  downFile: downFile,
  copyText: copyText,
  checkIOS: checkIOS,
  getLayoutHeight: getLayoutHeight
}


