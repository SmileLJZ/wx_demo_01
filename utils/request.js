// 用Promise方式封装request请求
const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
let requestTimes = 0;
export const request = (params) => {

  // 判断url是否带有 /my/ 请求路径 
  let header = {...params.header}
  if(params.url.includes("/my/")){
    header["Authorization"] = wx.getStorageSync("token");
  }

  requestTimes++;
  // 显示加载中效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      header:header,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result);
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        requestTimes--;
        if (requestTimes == 0) {
          //关闭等待效果
          wx.hideLoading();
        }

      }
    })
  })
}
