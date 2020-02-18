// pages/shareDetail/index.js
import api from "../../api/pdct.js"
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectList: [
      // { picUrl: '../../images/product.png', modelNo: '沙发萨芬' },
      // { picUrl: '../../images/product.png', modelNo: '沙发萨芬' },
      // { picUrl: '../../images/product.png', modelNo: '沙发萨芬' }
    ],
    psKey:'',
    title:''
  },
  onShareAppMessage(res){
    let shareInfo = {
      title:this.data.title,
      path: '../shareDetail/index?psKey=' + this.data.psKey,
      imageUrl:this.data.selectList[0].picUrl
    }
    return shareInfo
      
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.psKey = options.psKey
    let obj = {
      psKey:options.psKey
    }
    this.getSelectList(obj)
  },
  bigImage(e){
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.url], // 需要预览的图片http链接列表
      complete:((e)=>{
        console.log(e)
      })
    })

  },
  getSelectList(obj){
    api.shareDetail(obj).then((res)=>{
      console.log(res)
      // res.data.map(item => {
      //   item.picUrl = util.completion(res.web, item.picUrl)
      // })
      this.setData({
        selectList: res.data,
        title:res.title
      })
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

})