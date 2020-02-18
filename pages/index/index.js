//index.js
//获取应用实例
const app = getApp()
import api from '../../api/index.js'
import util from '../../utils/util.js'
// const regeneratorRuntime = require('../../lib/regenerator-runtime/runtime')
Page({
  data: {
    swiperList: [

    ],
    series: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goTo(e) {
    console.log(e)
    wx.navigateTo({
      url: '../store/index?type=' + e.currentTarget.dataset.type
    })
  },
  goToPdct(e){
    wx.reLaunch({
      url: '../pdct/index?type='+e.currentTarget.dataset.type,
    })
  },
  getSeries() {
    api.getSeries().then((res) => {
      console.log(res)
      // res.data.map(item => {
      //   item.typePic = util.completion(res.web, item.typePic)
      // })
      this.setData({
        series: res.data
      })
      wx.hideLoading()
    })
  },
 getSwiper() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let obj = {
      limit: 5,
      page: 1
    }
    try {
      api.getSwiperList(obj).then((res) => {
        console.log(res, '1111')

        // res.data.map(item => {
        //   item.picUrl = util.completion(res.web, item.picUrl)
        // })

        this.setData({
          swiperList: res.data
        })


      }).then(()=>{
        this.getSeries()
      })
    } catch (e) {
      
    }
  },
  onLoad: function() {

    this.getSwiper()
   
  },
  getUserInfo: function(e) {

  }
})