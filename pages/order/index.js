// pages/order/index.js
import { request } from "../../utils/request.js";
import wxPro from "../../utils/asyncWX.js";
import { formatTime } from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部订单',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '代发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders:[]//订单信息
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // const token = wx.getStorageSync("token");
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //   return;
    // }
    // 获取当前页面信息
    let curPages = getCurrentPages();
    let currentPages = curPages[curPages.length - 1];
    // 获取url上的type参数
    const {type=1}=currentPages.options ;
    // console.log(type);
    // 根据索引 选中标题
    this.changTitleByIndex(type-1);
    // this.getOrders(type);
  },
  async getOrders(type) {
    // const res = await request({
    //   url: "/my/orders/all",
    //   data: { type }
    // });
    // 假的数据
    console.log(type);
    const orders_all= require('../../data/json.js');
    let orders_arr =orders_all[`orders_all${type}`];
    this.setData({
      orders:orders_arr.message.orders.map(v=>({...v,new_create_time:formatTime(new Date(v.create_time*1000))}))
    })
    
  },
  // 根据索引来激活选中 标题
  changTitleByIndex(index){
    // console.log(index)
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
    this.getOrders(index+1);
  },
  //获取从子组件传来的索引
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.changTitleByIndex(index);
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