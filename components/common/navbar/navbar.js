// components/navbar/navbar.js
const app = getApp()
Component({
  // 启用插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isBack: {
      type: Boolean,
      value: false
    },
    isHome: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    layoutHeight: app.globalData.layoutHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 后退
    back() {
      wx.navigateBack()
    },
    // 回家
    goHome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  }
})
