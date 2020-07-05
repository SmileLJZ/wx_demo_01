import { request } from "../../utils/request.js";

Page({
  
  cateList:[],//分类数据
  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0
  },
  //左侧导航点击事件
  handleItemTap(e){
    console.log(e.currentTarget.dataset)
    //左侧列表置顶
    this.setData({
      'scrollTop': 0
    })
    //左侧选中的索引
    const {index} = e.currentTarget.dataset;
    //右侧商品数据
    let rightContent = this.cateList[index].children;
    this.setData({
      'currentIndex': index,
      'rightContent':rightContent
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const Cates = wx.getStorageSync("cates");
    // console.log(Cates)
    //判断本地存储中是否有该数据
    if(!Cates.data){
      // 获取分类数据
      this.getCateList();
    }else {
      if(Date.now()-Cates.time>1000*60*5){
        this.getCateList();
      }else{
        this.cateList = Cates.data;
        // console.log(this.cateList)
        // 左侧菜单数据
        let leftMenuList = this.cateList.map(v=> v.cat_name);
        //右侧商品数据
        let rightContent = this.cateList[0].children;
        this.setData({
          'leftMenuList':leftMenuList,
          'rightContent':rightContent
        })
      }
    }
    
  },
  getCateList(){
    request({
      url: `/categories`,
    }).then(result =>{
      // console.log(result.data.message)
      // 获取数据
      this.cateList = result.data.message;
      
      //把接口数据存入到本地存储中
      wx.setStorageSync("cates", {time:Date.now(),data:this.cateList});

      // 左侧菜单数据
      let leftMenuList = this.cateList.map(v=> v.cat_name);
      //右侧商品数据
      let rightContent = this.cateList[0].children;
      this.setData({
        'leftMenuList':leftMenuList,
        'rightContent':rightContent
      })
    });
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