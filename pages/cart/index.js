// pages/cart/index.js
import wxPro from "../../utils/asyncWX.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address') || [];
    //获取缓存中的购物车信息
    const cart = wx.getStorageSync('cart') || [];
    this.setData({address});
    this.setCart(cart);
  },
  // 修改商品是否选中
  async changeCheckboxItem(e){
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    // 找到被修改的商品对象的索引
    let index =  cart.findIndex(v=>v.goods_id === goods_id );
    cart[index].checked = !cart[index].checked;
    // 调用修改购物车状态方法
    this.setCart(cart);
  },
  // 全选与反选
  changeItemAllCheck(){
    // 获取data中的数据
    let {cart,allChecked } = this.data;
    //#修改值
    allChecked = !allChecked;
    // 循环修改cart数组中的选中状态
    cart.forEach(v=>v.checked=allChecked);
    // 把修改后的值填充回data或者缓存中
    this.setCart(cart);
  },
  // 点击收货地址按钮事件
  async tapChooseAddress() {
    try {
      // 获取 权限状态
      const res_Setting = await wxPro.getSetting();
      const scopeAddress = res_Setting.authSetting["scope.address"];
      if (scopeAddress === false) {
        // 诱导用户重新授权
        await wxPro.openSetting();
      }
      // 调用获取收货地址的api
      const res_chooseAddress = await wxPro.chooseAddress();
      res_chooseAddress.all = res_chooseAddress.provinceName + res_chooseAddress.cityName + res_chooseAddress.countyName + res_chooseAddress.detailInfo +'  邮政编码：'+res_chooseAddress.postalCode;
      wx.setStorageSync("address", res_chooseAddress);
      // console.log(res_chooseAddress)
    } catch (error) {
      console.log(error)
    }

  },
  //商品数量的编辑功能
  async tapItemNumEdit(e){
    // console.log(e)
    //获取传递过来的参数
    const {operation , id} = e.currentTarget.dataset;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到需要修改的商品索引
    const index = cart.findIndex(v=>v.goods_id === id);
    // console.log(cart)
    if(cart[index].num===1&&operation===-1){
      const res = await wxPro.showModal({content:'您是否要删除？'});
      if(res.confirm){
        cart.splice(index,1);
      }
    }else{
      // 修改数据
      cart[index].num += operation;
    }
    // console.log(cart)
    // 同步缓存和data
    this.setCart(cart);
  },
  // 修改购物车状态 同时重新计算其他数据
  setCart(cart){
    // 全选
    let allChecked = true;
    //#endregion
    let totalPrice = 0;
    let totalNum = 0;
    // console.log('allChecked1',allChecked)
    cart.forEach(v=>{
      if(v.checked){
        totalPrice += v.num*v.goods_price;
        totalNum += v.num;
      }else{
        // console.log('allChecked2',allChecked)
        allChecked = false;
      }
    })
    // console.log(cart.length!=0)
    // 判断cart数据是否为空
    allChecked = cart.length!=0?allChecked:false;
    // console.log('allChecked3',allChecked)
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });

    wx.setStorageSync("cart", cart);
  },
  //点击 结算
  async tapPay(){
    // 判断收货地址
    const {address,totalNum}=this.data;
    if(!address.userName){
      await wxPro.showToast({title:"您还没有选择收货地址"});
      return;
    }
    //判断用户是否选购商品
    if(totalNum===0){
      await wxPro.showToast({title:"您还没有选购商品"});
      return;
    }
    // 跳转到 支付页面
    wxPro.navigateTo({
      url: '/pages/pay/index'
    });

  }
})