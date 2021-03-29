// 引入封装请求
const { request, upLoadOss } = require('./connector')
const { baseUrl } = require('./env').dev //这里用的是ES6的写法

// 基于业务封装
module.exports = {
	//获取数据
	getData: (data) => {
		return request({ url: baseUrl + "xxxxxx", method: "get", data: data, noToken: true })
	},
	// 阿里云oss上传
	upFile(url, data) {
		return upLoadOss(url, data);
	},
}