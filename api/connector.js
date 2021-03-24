// 引入公用url env
const { baseUrl } = require('./env').dev //这里用的是ES6的写法
module.exports = {
  // 二次封装wx.request
  /**
   * param
   * url  请求链接
   * method 请求方式
   * data  请求数据
   * contentType 请求类型
   * noToken 是否带是token
   */
  request: async (param) => {
    let { url, method, data, contentType, noToken } = param
    // url： 为网络接口后面要拼接的动态路径
    //method :为请求方式
    //data:为要传递的参数 object类型
    //state:这里我是为了添加不添加子域名用的默认给了一个true
    let stringType = typeof data == 'string'
    // let _url = `${baseUrl}${url}` //子域名按需添加
    if (stringType) {
      url += `/${data}`
    }

    // 我们需要通过构建promise来将接受的数据导出
    return new Promise((resolve, reject) => {
      let header = {
        "content-type": contentType ? contentType : "application/x-www-form-urlencoded",
        'Tenant-Id': '698425',
      }
      try {
        wx.getStorageSync('access_token')
        let access_token = wx.getStorageSync('access_token')
        if (access_token && !noToken) {
          header['Skledu-Auth'] = access_token ? `bearer ${access_token}` : ''
        }
      } catch (e) {
        // Do something when catch error
      }
      wx.request({
        url: url,
        data: stringType ? null : data,
        method: method,
        header: header,
        //成功回调
        success: (res) => {
          if (res.statusCode != 200) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
            })
          }
          resolve(res)
        },
        //失败回调
        fail: (res) => {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: `网络不给力，请稍后重试`,
            showCancel: false,
            success() {
              if (reject) {
                //失败抛出
                reject(res)
              }
            }
          })
        }
      })
    })
  },
  /**
   * oss文件上传
   * url 链接 (阿里云、腾讯等oss)
   * data 请求参数  {filePath 文件路径  params上传参数 }
   */
  upLoadOss: (url, data) => {

    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: url,
        filePath: data.filePath,
        name: 'file',//必须填file
        /**上传的参数**/
        // formData:{
        //   key: data.params.key,
        //   policy: data.params.policy,
        //   OSSAccessKeyId: data.params.OSSAccessKeyId,
        //   signature: data.params.signature,
        //   'success_action_status': data.params.success_action_status,
        //   'x-oss-security-token': data.params.security
        // },
        formData: data.params,
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          console.log(res)
          reject(res)
        }
      })
    })
  }
}