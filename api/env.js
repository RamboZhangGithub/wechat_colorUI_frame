//线上环境url，测试环境url, 开发环境url
// let developUrl = "https://datastar.skledu.com/api";			// 正式环境
// let developUrl = "http://hlw.skledu.com/api/"            // 开发环境
let developUrl = "http://192.168.2.58:8066/"                // 开发环境
let ossBaseUrl = ".oss-cn-shenzhen.aliyuncs.com/" //oss背景路线

let qqmapAccount = 'MPZBZ-KZBLK-QKXJ6-AOUZV-BS7TF-HRFRE'  //腾讯地图key
module.exports={
  dev:{
    baseUrl: developUrl
  },
  qqmapAccount:qqmapAccount,
  ossUrl:(bucket)=>{
    return `https://${bucket}${ossBaseUrl}`
  }
}