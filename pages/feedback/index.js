// pages/feedback/index.js
import wxPro from "../../utils/asyncWX.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '应用反馈',
        isActive: true
      },
      {
        id: 1,
        value: '商品/商家投诉',
        isActive: false
      }
    ],
    chooseImgs: [],
    textVal: ""
  },
  UpLoadImgs: [],//外网图片数组
  // 点击自定义图片组件
  tapRemoveImg(e) {
    // console.log(e)
    // 获取选中的索引
    const { index } = e.currentTarget.dataset;
    // 获取data中的图片数组
    let { chooseImgs } = this.data;
    // 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    });
  },
  // 点击"+"选择图片
  tapChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result);

        this.setData({
          //拼接数组
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        });
      },
      fail: () => { },
      complete: () => { }
    });
  },
  // 根据索引来激活选中 标题
  changTitleByIndex(index) {
    // console.log(index)
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
    this.getOrders(index + 1);
  },
  //获取从子组件传来的索引
  handleTabsItemChange(e) {
    const { index } = e.detail;
    this.changTitleByIndex(index);
  },
  // 文本框输入事件
  handleTextInput(e) {
    // console.log(e);
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交按钮点击
  tapFormSubmit() {
    // 获取文本域内容
    const { textVal, chooseImgs } = this.data;
    // 合法性的检验
    if (!textVal.trim()) {
      wx.showToast({
        title: "输入不合法",
        icon: 'none',
        mask: true
      });
      return;
    }
    // 显示正在上传中
    wx.showLoading({
      title: '正在上传中',
      mask: true
    });
    // 判断是否有需要上传的图片
    if (chooseImgs.length != 0) {
      // 准备上传图片
      chooseImgs.forEach((v, i) => {
        console.log(v)
        wx.uploadFile({
          url: 'http://images.ac.cn/api/upload',
          filePath: v,
          name: 'image',
          formData: {
            'apiType': "this、ali、huluxia",
            'privateStorage': 'ftp、oos、cos',
            'token': "6504f5f00a98ea74a87f416c3f1e"
          },
          success: (result) => {
            //图片上传失败了，可能操作有问题
            console.log(result);
            let url = JSON.parse(result.data).url;
            this.UpLoadImgs.push(url);

            // 所有图片都上传了才触发
            if (i === chooseImgs.length - 1) {
              console.log('已提交到后台');
              wx.hideLoading();
              // 重置页面
              this.setData({
                textVal: '',
                chooseImgs: []
              });
              // 返回上一个页面
              wx.navigateBack({
                delta: 1
              });
            }
          },
          fail: () => { },
          complete: () => { }
        });
      })
    } else {
      console.log('已提交文本到后台');
      // 重置页面
      this.setData({
        textVal: ''
      });
      // 返回上一个页面
      wx.navigateBack({
        delta: 1
      });
    }


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