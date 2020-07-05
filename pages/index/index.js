//Page Object
import { request } from "../../utils/request.js";
Page({
  data: {
    swiperList:[],//轮播图数组
    catesList:[] ,//分类导航数据
    floorList:[] //楼层数据
  },
  //options(Object)
  onLoad:  function(options){
    // 获取轮播图数据
     this.getSwiperList();
    //获取分类导航数据
     this.getCateList();
    //获取楼层数据
     this.getFloordata();
  },
  getSwiperList(){// 获取轮播图数据方法
    request({
      url: `/home/swiperdata`,
    }).then(result =>{
      this.setData({
        swiperList: result.data.message
      })
    });
  },
  getCateList(){//获取分类导航数据方法
    request({
      url: `/home/catitems`,
    }).then(result =>{
      this.setData({
        catesList: result.data.message
      })
    });
  },
  getFloordata(){//获取楼层数据方法
    request({
      url: `/home/floordata`,
    }).then(result =>{
      // console.log(result.data.message)
      this.setData({
        floorList: result.data.message
      })
    });
  }
});