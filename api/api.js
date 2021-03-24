// 引入封装请求
const { request, upLoadOss } = require('./connector')
const { baseUrl } = require('./env').dev //这里用的是ES6的写法

// 基于业务封装
module.exports = {
	//获取城市列表 
	getCity: (data) => {
		return request({ url: baseUrl + "skledu-patriarch/ps-wxapp/school/city/list", method: "get", data: data, noToken: true })
	},

	/**
	 * 无登录接口
	 */
	// 学校详情
	schoolDetailN: (data) => {
		return request({ url: baseUrl + 'skledu-patriarch/ps-wxapp/school/queryDetail', method: "get", data: data, noToken: true })
	},
	// 搜索学校
	searchNSchool: (data) => {
		return request({ url: baseUrl + 'skledu-patriarch/ps-wxapp/school/query', method: "get", data: data, noToken: true })
	},

	// 获取OSS SST临时授权信息
	getOssToken: (data) => {
		return request({ url: baseUrl + 'skledu-patriarch/common/assumeRole', method: "get", data: data });
	},
	// 阿里云oss上传
	upFile(url, data) {
		return upLoadOss(url, data);
	},
}