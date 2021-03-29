App({
  onLaunch: function () {
    this.checkSystem()
  },
  globalData: {
    userInfo: null,
    systemInfo: {},
    isIphoneX: false
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
})