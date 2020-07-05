Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /*组件的属性列表*/
  properties: {
    title: {
      type: String,
      value: '标题'
    },
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    // 弹窗取消按钮文字
    btn_no: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: '确定'
    }
  },
  /* 组件的初始数据 */
  data: {
    flag:false,
    bgOpacity:0,
    wrapAnimate:'wrapAnimate',
    popupAnimate:'popupAnimate'
  },
  /* 组件的方法列表 */
  methods: {
    showPopup() {
      this.setData({
        flag: true,
        bgOpacity:0,
        wrapAnimate:'wrapAnimate',
        popupAnimate:'popupAnimate'
      })
      
    },
    //隐藏弹框
    hidePopup() {
      const that = this;
      this.setData({ 
        bgOpacity: 0.7, 
        wrapAnimate: "wrapAnimateOut",
        popupAnimate:"popupAnimateOut"
      })
      setTimeout(()=>{
        that.setData({flag: false})
      },1200)
    },
    /* 内部私有方法建议以下划线开头 triggerEvent 用于触发事件 */
    _error(e) {//触发取消回调
      this.triggerEvent("error")
    },
    _success(e) {//触发成功回调
      this.triggerEvent("success");
    }
  }
})
