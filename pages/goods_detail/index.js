
// pages/goods_detail/index.js
import { request } from "../../utils/request.js";
import wxPro from "../../utils/asyncWX.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false //商品是否被收藏
  },
  //放大预览图数据
  goodsInfo: {},
  //获取商品详情数据
  async getGoodsDetail(goods_id) {
    // console.log(goods_id);
    const res = await request({ url: "/goods/detail", data: { goods_id } });
    this.goodsInfo = res.data.message;
    // console.log(obj)
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    //判断当前商品是否被收藏
    let isCollect = collect.some(v => v.goods_id === this.goodsInfo.goods_id);

    this.setData({
      'goodsObj': {
        pics: res.data.message.pics,
        goods_price: res.data.message.goods_price,
        goods_name: res.data.message.goods_name,
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
        
      },
      isCollect
    })
  },
  //点击轮播图，放大预览
  chickPreviewImage(e) {
    // console.log(e.currentTarget.dataset)
    const urls = this.goodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  //点击加入购物车
  chickCarAdd() {
    // 获取缓存中的购物车
    let cart = wx.getStorageSync("cart") || [];
    // 判断商品是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.goodsInfo.goods_id);
    if (index === -1) {
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    } else {
      cart[index].num++;
    }
    // 把购物车数据存入缓存中
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
  },
  // 点击 商品收藏图标
  tapCollect() {
    let isCollect = false;
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect") || [];
    //判断当前商品是否被收藏
    let index = collect.findIndex(v => v.goods_id === this.goodsInfo.goods_id)

    if (index != -1) {//已收藏过
      collect.splice(index, 1);
      isCollect = false;
      wxPro.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    } else {//未收藏过
      collect.push(this.goodsInfo);
      isCollect = true;
      wxPro.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 把collect数组存入缓存中
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect
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
    // 获取当前页面信息
    let curPages = getCurrentPages();
    let currentPages = curPages[curPages.length - 1];
    // 获取url上的goods_id参数
    const { goods_id } = currentPages.options;
    this.getGoodsDetail(goods_id);
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