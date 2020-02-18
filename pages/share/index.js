// pages/share/index.js
import api from "../../api/pdct.js"
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',

    selectList:[
      
      
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.selectId)
    let obj = {
      ids: options.selectId
    }
    this.getSelectList(obj)
  },
  getTitle(e){
    console.log(e)
    this.data.title = e.detail.value;
  },
  getItemTitle(e){
    this.data.selectList[e.currentTarget.dataset.index].explain = e.detail.value;
  },  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  getSelectList(obj){
    api.selectList(obj).then((res) => {
      console.log(res,"222222222")
      res.data.map(item => {
        item.picUrl = item.picUrl[0]
        item.explain = ''
      })
      this.setData({
        selectList: res.data
      })
    })
  },
  share(){
    // this.data.selectList.map((item)=>{
    //   item = JSON.stringify(item)
    //   console.log(item,typeof(item))
    // })
    // console.log(this.data.selectList, this.data.selectList[0].picUrl)
    let obj = {
      title:this.data.title,
      list: JSON.stringify(this.data.selectList)
    }
    console.log(obj)
    api.shareInfo(obj).then((res)=>{
      console.log(res,213213)
      wx.navigateTo({
        url: '../shareDetail/index?psKey=' + res.data.psKey
      })
    })
    
  },
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