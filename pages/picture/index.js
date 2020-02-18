// pages/picture/index.js
import api from "../../api/picture.js"
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList:[],
    image:[],
    total:0,
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImagesList(3, this.data.page)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getImagesList(limit, page){
    let obj = {
      page, limit
    }
    api.getPictrue(obj).then((res)=>{
      let imageList = [...this.data.imageList];
      let image = [...this.data.image];
      res.data.forEach((item)=>{
        imageList.push(item);
        // image.push(item.picUrl);
      })

      this.setData({
        imageList: imageList,
        image: image,
        total:res.total
      })
      console.log(res)
    })
  },
  getImage(e){
    wx.previewImage({
      current: e.currentTarget.dataset.path, // 当前显示图片的http链接
      urls: this.data.imageList, // 需要预览的图片http链接列表
      success:((e)=>{
        console.log(e)
      }),
      fail:((e)=>{
        console.log(e)
      })
    })
    console.log(e)
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
    console.log(this.data.imageList.length, this.data.total, "dfgdfggf")
    if (this.data.imageList.length < this.data.total) {
      this.data.page++;
      this.getImagesList(3, this.data.page)
    } else {
      wx.showToast({
        title: '已经到底了'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})