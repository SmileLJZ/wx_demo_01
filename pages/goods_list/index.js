// pages/goods_list/index.js
import { request } from "../../utils/request.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:'综合',
        isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    goodsList:[],//商品列表
    
  },
  QueryParams:{ //接口所需要的传参
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  totalPages:1,//获取的商品列表总页数默认为1
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid || '';
    this.QueryParams.query = options.query|| '';
    //调用获取商品列表方法
    this.getGoodsList();
  },
  //获取商品列表
  async getGoodsList(){
    
    const res = await request({url:'/goods/search',data:this.QueryParams});
    // console.log(res.data.message.goods)
    // 获取总条数
    const total = res.data.message.total;
    // 计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    //拼接数组
    this.setData({
      'goodsList':[...this.data.goodsList,...res.data.message.goods]
    })
  },
  //获取从子组件传来的索引
  handleTabsItemChange(e){
    const {index} = e.detail;
    let { tabs } = this.data;
    let newGoodsList = this.data.goodsList.sort((a,b)=>{
      if(index==0){
        return b.goods_id - a.goods_id;
      }
      if(index==1){
        return 0.5 - Math.random()
      }
      if(index==2){
        return a.goods_price - b.goods_price;
      }
    });
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs,
      'goodsList':newGoodsList
    })
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
  onPullDownRefresh: async function () {
    // 重置数据
    this.setData({
      goodsList:[]
    });
    // 重置页码
    this.QueryParams.pagenum=1;
    // 重新发送请求
    await this.getGoodsList();
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log("页面触底")
    if(this.QueryParams.pagenum >= this.totalPages){
      wx.showToast({
        title: '没有下一页数据'
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})