// pages/cart/index.js
import wxPro from "../../utils/asyncWX.js";
import { request } from "../../utils/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,//弹窗是否显示
    address: [],
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  order_obj: {}, //假的订单数据
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address') || [];
    //获取缓存中的购物车信息
    let cart = wx.getStorageSync('cart') || [];
    //总价格
    let totalPrice = 0;
    // 总数量
    let totalNum = 0;
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked);
    this.setData({ address });

    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });
  },
  //点击 支付
  async tapOrderPay() {
    try {
      //  判断缓存中是否存在token
      const token = wx.getStorageSync("token");
      if (!token) {
        // 跳转到 支付页面
        wxPro.navigateTo({
          url: '/pages/auth/index'
        });
        return;
      }
      // console.log("已经存在token了");
      // 创建订单
      // 请求体参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods = [];
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));
      const orderParams = { order_price, consignee_addr, goods };
      // console.log(orderParams);
      // 发送请求获取订单编号
      // const {order_number} = await request({
      //   url:"/my/orders/create",
      //   method:"POST",
      //   data:orderParams
      // })
      // 假的订单数据
      const order_obj = {
        order_number: '1',
        order_price,
        consignee_addr,
        goods,
        is_send: false,
        pay_status: "0",
        user_id: 23
      }
      this.order_obj = order_obj;
      // const { order_number } = order_obj;
      // console.log(order_number);
      // 发起预支付
      // const {pay} = await request({
      //     url:"/my/orders/req_unifiedorder",
      //     method:"POST",
      //     data:{order_number}
      //   })
      // 发起微信支付
      // await requestPayment(pay);
      // const res = await request({
      //   url: "/my/orders/chkOrder",
      //   method: "POST",
      //   data: { order_number }
      // });
      // await wxPro.showToast({ title: "支付成功" });
      // wxPro.navigateTo({
      //   url: '/pages/order/index'
      // });
      await this.selectComponent("#popup").showPopup();
    } catch (error) {
      console.log(error);

    }
  },

  //取消事件
  async _error() {

    // console.log('你点击了取消');
    this.order_obj.is_send = false;
    // 把order_obj存入缓存中
    wx.setStorageSync("order_obj", this.order_obj);
    await this.selectComponent("#popup").hidePopup();
    setTimeout(() => {
      wxPro.showToast({ title: "支付失败" });
    }, 1200)
  },
  //确认事件
  async _success() {
    // console.log('你点击了确定');
    this.order_obj.is_send = true;
    // 把order_obj存入缓存中
    wx.setStorageSync("order_obj", this.order_obj);
    await this.selectComponent("#popup").hidePopup();
    setTimeout(() => {
      wxPro.showToast({ title: "支付成功" });
      //手动删除缓存中 已支付的商品
      let newCart = wx.getStorageSync("cart");
      newCart = newCart.filter(v => !v.checked);
      wx.setStorageSync("cart", newCart);
      // 支付成功后跳转页面
      wxPro.navigateTo({
        url: '/pages/order/index'
      });
    }, 1200);
  }

})