// pages/furnitureDetail/index.js
import api from "../../api/pdct.js"
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},
    nav:[],
    id:0
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.data.id = options.id
     this.getSeries()
  },
  goToIndex(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  bigImage(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
      complete: ((e) => {
        console.log(e)
      })
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.getfurnitureDetail(this.data.id )
  },
   getSeries(){
    api.getSeries().then((res) => {
      this.data.nav = res.data;
      this.getfurnitureDetail(this.data.id,res.web)
      console.log(1111)
    })   
  },
  getfurnitureDetail(id,url){
    let obj = {
      id
    }
    api.furnitureDetail(obj).then((res)=>{
      console.log(res,1111)
      res.data.pdType = util.changeString(res.data.pdType, this.data.nav)
      this.setData({
        detail:res.data
      })
    })
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
    let shareInfo = {
      title: this.data.detail.pdType +'型号'+ this.data.detail.modelNo,
      path: '../pdctDetail/index?id=' + this.data.id,
      imageUrl: this.data.detail.picUrl
    }
    return shareInfo
  }
})