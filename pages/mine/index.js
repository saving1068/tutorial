// pages/mine/index.js
import api from '../../api/profile.js'
import util from '../../utils/util.js'
import WxParse from '../../wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    showPopup: false,
    phone: null,
    wxParseData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAboutUs()
  },
  bigImage(e) {
    wx.previewImage({
      current: this.data.detail.picUrl, // 当前显示图片的http链接
      urls: [this.data.detail.picUrl], // 需要预览的图片http链接列表
      complete: ((e) => {
        console.log(e)
      })
    })

  },
  getAboutUs(){
    wx.showLoading({
      title: '加载中',
    })
    api.getAboutUs({}).then((res)=>{
      // res.data.picUrl = util.completion(res.web, res.data.picUrl)
      this.setData({
        detail:res.data
        
      })
      wx.hideLoading()
    })
  },
  openMap(){
    let { latitude, longitude } = util.bMapTransQQMap(this.data.detail.log, this.data.detail.lat)
    let obj = {
      latitude,
      longitude,
      scale:18,
      name: this.data.detail.name,
      address: this.data.detail.address
    }
    console.log(obj)
    wx.openLocation({
      ...obj,
      success:((res)=>{
        console.log(res)
      }),
      error:((e)=>{
        console.log(e)
      }),
      complete:((e)=>{
        console.log(e)
      })
    })
  },
  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: this.data.detail.telphone //仅为示例，并非真实的电话号码
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