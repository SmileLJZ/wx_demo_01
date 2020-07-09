# 简介
> 该项目是跟着B站做的，自己做了部分优化和调整（由于支付、订单等需要企业微信和后台，所以无奈改成了跳过支付环节，调用本地json）

[接口文档传送口](https://www.showdoc.cc/128719739414963?page_id=2513235043485226)

# 页面效果展示
> 首页

!['首页'](/demo_gif/首页.gif )

> 商品查看

!['商品查看'](/demo_gif/商品查看.gif )

> 购物

!['购物'](/demo_gif/购物.gif )

> 个人中心

!['个人中心'](/demo_gif/个人中心.gif )

# 项目目录结构
|目录名|作用|
|--|:--:|
|styles|存放公共样式|
|components|存放组件|
|lib|存放第三方库|
|utils|自己的帮助库|
|request|自己的接口帮助库|

---
# 项目页面
|页面名称|名称|
|--|:--:|
|首页|index|
|分类页面|category|
|商品列表页面|goods_list|
|商品详情页面|goods_detail|
|购物车页面|cart|
|收藏页面|collect|
|订单页面|order|
|搜索页面|search|
|个人中心页面|user|
|意见反馈页面|feedback|
|登陆页面|login|
|授权页面|auth|
|结算页面|pay|

# 首页
## 1）页面效果
!['首页图片'](/markdown_img/01.png)

## 2）业务逻辑
1. 使用tabbar实现底部导航功能
2. 使用自定义组件的方式实现**头部搜索框**
3. 加载**轮播图**数据
4. 加载**导航**数据
5. 加载**楼层**数据

## 3）接口  

1. 获取首页轮播图数据
```
https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata

```
2. 获取首页导航菜单数据
```
   https://api-hmugo-web.itheima.net/api/public/v1/home/catitems
```
3. 获取首页楼层数据
```
   https://api-hmugo-web.itheima.net/api/public/v1/home/floordata
```
## 4）关键技术 
 - 小程序内置`request API`
 - es6的`promise`
 - 小程序`swiper`组件
 - 自定义组件实现搜索框

# 分类页面
## 1）效果
!['分类页面图片'](/markdown_img/02.png)
## 2）业务逻辑
1. 加载分类页面数据
2. 点击左侧菜单，右侧数据动态渲染
## 3）接口
 1. 分类页面数据
```
   https://api-hmugo-web.itheima.net/api/public/v1/categories
```
## 4）关键技术
- `scroll_view` 组件
- es7 `async` 和`await`
## 5）小程序中使用es7的async语法
es7的`async`号称是解决回调地狱的最终方案
1. 在小程序的开发工具中，勾选es6转es5语法
2. 下载facebook的regenerator库中的runtime.js
3. 在小程序目录下新建文件夹`lib/runtime/runtime.js`,将代码拷贝进去
4. 在每一个需要使用async语法的页面js中，都引入（不能全局引入）
```javascript
   import regeneratorRuntime from '../../lib/runtime/runtime';
```

最新消息：
>在 1.02.1904282 以及之后版本的开发工具中，增加了增强编译的选项来增强ES6转ES5的能力，启用后会使用新的编译逻辑以及提供额外的选项供开发者使用。

[相关详细信息传送门](https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html#%E5%A2%9E%E5%BC%BA%E7%BC%96%E8%AF%91)

# 商品列表页面
## 效果
!['商品列表页面图片'](/markdown_img/03.png)
## 2）业务逻辑
1. 加载商品列表数据
2. 启用下拉页面功能
   1. 页面的json文件中开启设置`enablePullDownRefresh:true`
   2. 页面的js中，绑定事件`onPullDownRefresh`
3. 启用上拉页面功能，`onReachBottom`页面触底事件
4. 加载下一页功能

## 3）接口
 1. 商品列表搜索
```
   https://api-hmugo-web.itheima.net/api/public/v1/goods/search
```
## 4）关键技术
- 小程序配置文件中启用**上拉**和**下拉**功能
- **搜索框**和**tab栏**是小程序的**自定义组件**（有组件事件和参数交互）
  

# 商品详情页面
## 效果
!['商品详情页面图片'](/markdown_img/04.png)
## 2）业务逻辑
1. 渲染商品详情数据
2. 点击图片，调出图片画廊，进行预览
3. 点击收藏
4. 联系客服
5. 分享功能
6. 加入购物车

## 3）接口
 1. 获取详情数据接口
```
   https://api-hmugo-web.itheima.net/api/public/v1/goods/detail
```
 2. 加入购物车接口，使用本地存储`wx.setStorageSync()`来维护购物车数据
 3. 立即购买接口（相当于是 创建订单接口，需要token）
```
   https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create
```
   
## 4）关键技术
- swiper组件
- 本地存储实现**收藏功能**
- **联系客服** 在小程序管理后台中，直接添加即可
- 富文本标签 渲染富文本
- 小程序预览图片接口



# 收藏页面
## 效果
!['商品详情页面图片'](/markdown_img/05.png)
## 2）业务逻辑
1. 获取本地存储中的数据进行渲染
2. 点击商品可以跳转到商品详情页面

## 3）接口
 无

   
## 4）关键技术
- 小程序，自定义组件
- 本地存储，加载收藏数据

# 购物车页面
## 效果
!['购物车页面图片'](/markdown_img/06.png)
## 2）业务逻辑
1. 渲染购物车数据
2. 添加收货地址
3. 修改商品数量
4. 单选和全选功能

## 3）接口
 1. 获取购物车数据，用本地存储实现
 2. 调用微信的收货地址`wx.getSetting()`

## 4）关键技术
- 小程序 `选择收货地址 api`
- 小程序 复选框组件
  
# 支付页面
## 效果
!['支付页面图片'](/markdown_img/07.png)
## 2）业务逻辑
1. 获取微信收货地址
2. 渲染购物车中要结算的商品
3. 实现支付
   1. 获取微信的登录信息
   2. 获取自己后台返回的支付相关参数
   3. 调用微信接口实现支付
   4. 支付成功创建订单
   5. 跳转到订单页面
## 5）支付流程
!['5）支付流程图片'](/markdown_img/08.png)
## 4）接口
 1. 获取预支付参数
```
   https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder
```
 2. 创建订单
```
   https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create
```

 1. 更新订单状态
```
   https://api-hmugo-web.itheima.net/api/public/v1/my/orders/chkOrder
```

## 5）关键技术
- 小程序 支付api


# 授权页面
## 效果
!['授权页面图片'](/markdown_img/09.png)
## 2）业务逻辑
!['业务逻辑图片'](/markdown_img/10.png)

1. 获取用户信息
   返回`encryptedData , rawData , iv , signature`
2. 小程序登录
返回 `code`
3. 提交数据到自己的后台，执行`post`请求提交数据
4. 将`token`和用户数据`rawData`存入本地存储

## 3）接口
 1. 提交数据到后台，返回token
```
   https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin
```



# 订单列表页面
## 效果
!['商品详情页面图片'](/markdown_img/11.png)
## 2）业务逻辑
1. 根据不同的状态去加载不同的订单数据
2. 点击标题紧挨着对应数据

## 3）接口
 1. 查询订单数据
```
   https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all
```

## 4）关键技术
- 小程序 自定义组件的传参，父向子动态传参 `this.selectComponent("#tabs")`
- 时间戳 格式化处理

# 搜索页面
## 效果
!['搜索页面图片'](/markdown_img/12.png)
## 2）业务逻辑
1. 获取输入框的值进行搜索和渲染
2. 点击取消按钮时清除输入状态，修改页面模样
   

## 3）接口
 1. 搜索建议查询
```
   https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch
```

## 4）关键技术
- 小程序 输入框组件
- 输入值改变时，为了提高性能，使用防抖技术

# 个人中心页面
## 效果
!['个人中心页面图片'](/markdown_img/13.png)
## 2）业务逻辑
1. 获取登录信息
2. 加载收藏信息
3. 查询订单状态

## 3）接口
 1. 获取用户信息
 2. 获取收藏数据，从本地存储中获取
 3. 获取订单数据
```
   https://api-hmugo-web.itheima.net/api/public/v1/my/orders/all
```

## 4）关键技术
- css属性filter(高斯模糊)的使用
  
# 意见反馈页面
## 效果
!['意见反馈页面图片'](/markdown_img/14.png)
## 2）业务逻辑
1. 点击`+`按钮可以选择本地图片，并且显示到页面上
2. 点击提交可以上传到接口地址 图片图床上
3. 点击图片，会移除自己
4. 点击tab栏的标题，可以切换选中效果

## 3）接口
无

## 4）关键技术
- 自定义组件tab
- 自定义组件 图片删除组件
- 小程序`上传文件api`