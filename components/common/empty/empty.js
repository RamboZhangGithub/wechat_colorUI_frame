// components/empty/empty.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isEmpty: {
      type: Boolean,
      value: false
    },
    emptyMsg:{
      type:String,
      value:'暂无数据'
    },
    noMore: {
      type: Boolean,
      value: false
    },
    noMoreMsg: {
      type:String,
      value:'没有更多数据'
    },
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

  }
})
