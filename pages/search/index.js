import { request } from "../../utils/request.js";
import wxPro from "../../utils/asyncWX.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],//商品列表
    isFocus: false, //取消搜索按钮
    inputValue: ""
  },
  TimeId: -1,
  //输入框值变化绑定事件
  handleInput(e) {
    // 获取输入框的值
    const { value } = e.detail;
    // 检测合法性
    if (!value.trim()) {// 当值不合法时
      this.setData({
        goods: [],
        isFocus: false
      })
      return;
    }
    // 准备发送请求获取数据
    clearTimeout(this.TimeId);
    const that = this;
    this.TimeId = setTimeout(() => {//防抖
      this.qsearch(value);
      this.setData({
        isFocus: true
      })
    }, 1000);
  },
  // 发送请求获取搜索建议数据
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: { query }
    });
    // console.log(res);
    this.setData({
      goods: res.data.message
    })
  },
  //点击取消按钮
  async tapCancel() {
    this.setData({
      inputValue: '',
      goods: [],
      isFocus: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})