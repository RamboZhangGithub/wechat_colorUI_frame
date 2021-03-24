// pages/components/home/home.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 通用组件
    commonComopents: [
      { title: '操作条', name: 'bar', color: 'purple', icon: 'vipcard' },
      { title: '导航栏 ', name: 'nav', color: 'mauve', icon: 'formfill' },
      { title: '列表', name: 'list', color: 'pink', icon: 'list' },
      { title: '卡片', name: 'card', color: 'brown', icon: 'newsfill' },
      { title: '表单', name: 'form', color: 'red', icon: 'formfill' },
      { title: '时间轴', name: 'timeline', color: 'orange', icon: 'timefill' },
      { title: '聊天', name: 'chat', color: 'green', icon: 'messagefill' },
      { title: '轮播', name: 'swiper', color: 'olive', icon: 'album' },
      { title: '模态框', name: 'modal', color: 'grey', icon: 'squarecheckfill' },
      { title: '步骤条', name: 'steps', color: 'cyan', icon: 'roundcheckfill' },
    ],
    // 业务组件
    businessComponents: [
      { title: '信息遮罩', name: 'info_mask', color: 'purple', icon: 'vipcard' },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
