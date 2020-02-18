// pages/store/index.js
import api from '../../api/picture.js'
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    type:1,
    page:1,
    total:0
  },
  getImageList(e) {
    console.log(e)
    let image = []
    this.data.imageList.forEach(item =>{
      image.push(item.picUrl)
    })
    console.log(image)
    wx.previewImage({
      current: e.currentTarget.dataset.picurl, // 当前显示图片的http链接
      urls: image, // 需要预览的图片http链接列表
      fail:((e)=>{
        console.log(e)
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  getImage(page){
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    let obj = {
      imageType:this.data.type,
      limit:5,
      page: page
    }
    api.getImageList(obj).then((res)=>{
     
      res.data.map(item => {
        item.picUrl = util.completion(res.web, item.picUrl) 
      })
      let imageList = [...this.data.imageList];
      res.data.forEach((item)=>{
        imageList.push(item)
      })
      console.log(res.data)
      this.setData({
        imageList: imageList,
        total: res.total
      })
      wx.hideLoading()
    })
  },
  onLoad: function (options) {
    console.log(options)
    this.data.type = options.type;
    wx.setNavigationBarTitle({
      title: options.type == 1?'专卖店形象':'团队形象' ,
    })
    this.getImage(this.data.page)
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
    if(this.data.imageList.length<this.data.total){
      this.data.page++;
      this.imageList(this.data.page)
    }
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