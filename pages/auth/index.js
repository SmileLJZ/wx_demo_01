// pages/auth/index.js
import wxPro from "../../utils/asyncWX.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  async tapGetUserInfo(e){
    // console.log(e)
    try{
      //获取用户信息
      const {encryptedData , rawData , iv , signature } = e.detail;
      // 获取登录成功后的code
      const { code } = await wxPro.login();
      //请求参数
      const loginParams = {encryptedData , rawData , iv , signature , code };
      console.log(loginParams);
      // 发送请求获取用户的token
      // const { token } = await wxPro.request({url:"/uesrs/wxlogin",data:loginParams,method:"post"});
      //假的token
      const  token  = "666";
      // 把token存入缓存中，同时跳转回上一个页面
      wx.setStorageSync("token", token);
      wx.navigateBack({
        delta: 1
      });

    }catch(error){
      console.log(error);
    }

  }
})