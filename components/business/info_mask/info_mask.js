// components/login_mask/login_mask.js
Component({
  options:{
    addGlobalClass:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    showLogin: {
      type: Boolean,
      value: true
    },
    // 是否可以关闭
    canClose: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideLoginMap() {
      this.triggerEvent('hideLoginMap')
    },
    getPhoneNumber(e) {
      this.triggerEvent('getPhoneNumber', e)
    }
  }
})
