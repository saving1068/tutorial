// pages/furniture/index.js
import api from "../../api/pdct.js"
import util from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBar: [
      { typeName:'全部',id:''}
    ],
    navCurrent: 0,
    list: [
    ],
    imageList: [],
    page: 1,
    listRows: 10,
    noData: false,
    ncType: '',
    loadComplete: false,
    canClick: true,
    ifSelect:false,
    selectList:[
      // { picUrl: '../../images/product.png', title: '沙发萨芬' },
      // { coverUrl: '../../images/picture.png', title: '沙发萨芬' },
      // { coverUrl: '../../images/profile.png', title: '沙发萨芬' },
    ],
    page:1,
    total:0,
    keyWord:'',
    toView:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.ncType = options.type||'';
   
    this.getSeries()
    let obj = {
      pdType: this.data.ncType,
      page: this.data.page,
      limit:3,
      keyWord: this.data.keyWord
    }
    this.getfurniture(obj)
  },
  search(e){
    this.data.list = [];
    let obj = {
      keyWord:e.detail.value,
      pdType: this.data.ncType,
      limit: 3,
      page:1
    }
    this.data.page = 1;
    this.data.keyWord = e.detail.value
    this.getfurniture(obj)
  },
  share(){
    let selectId = [];
    this.data.selectList.forEach((item)=>{
      selectId.push(item.id)
    })
    if (selectId.length<=0){
      return wx.showToast({
        title: '请选入款式',
        icon:'none'
      })
    }
    let obj ={
      ids: selectId.join(',')
    }
    api.selectList(obj).then((res)=>{
      console.log(res)
      wx.navigateTo({
        url: '../share/index?selectId=' + selectId,
      })
    })
    
  },
  reduce(e){
    let index = this.data.selectList.findIndex((item) => item.picUrl == e.currentTarget.dataset.item.picUrl);
    let select = [...this.data.selectList];
    select.splice(index,1)
    this.setData({
      selectList: select
    })
  },
  pushShare(e){
    let item = this.data.selectList.find((item) => item.picUrl == e.currentTarget.dataset.item.picUrl[0]);
    let select = [...this.data.selectList];
    console.log(e.currentTarget.dataset)
    console.log(item)
    
    if(!item){
      select.push(e.currentTarget.dataset.item)
      console.log(select)
      this.setData({
        selectList:select
      })
      
    }else{
      wx.showToast({
        title: '请勿重复添加',
        icon:'none'
      })
    }
  },
  select(){
    this.setData({
      ifSelect:!this.data.ifSelect
    })
  },
  getSeries(){
    api.getSeries().then((res)=>{
      let navBar = [...this.data.navBar];
      res.data.forEach((item)=>{
        item.tid = `A${item.id}`;
        navBar.push(item)
      })
      console.log(navBar)
      let index = navBar.findIndex((item) => item.id == this.data.ncType);
      index = index != -1 ? index:0;

      this.setData({
        
        navBar: navBar,
        navCurrent:index,
        toView: `A${this.data.ncType}` ,
      })
    })
  },
  getfurniture(obj){
    this.data.canClick =false;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    console.log(obj)
    api.getfurnitureList(obj).then((res) => {
     
      let list = [...this.data.list];
      console.log(list,'11111111111111111')
      list = [...list,...res.data];
      list.forEach((item)=>{
        this.data.imageList.push(item.picUrl[0])
      })
      console.log(list)
      this.setData({
        list: list,
        canClick:true,
        total: res.total
      })
      wx.hideLoading()
    })
  },
  getImage(e){
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: this.data.imageList, // 需要预览的图片http链接列表

    })

  },
  navChange(e) {
    if (this.data.canClick) {
      this.setData({
        // canClick: false,
        navCurrent: e.currentTarget.dataset.index,
        ncType: e.currentTarget.dataset.type,
        list: [],
        // noData: false,
        // loadComplete: false,
      })
      let obj = {
        pdType: e.currentTarget.dataset.type,
        page: 1,
        limit: 3,
        keyWord: this.data.keyWord
      }
      this.data.page = 1;
      this.getfurniture(obj)

    }else{
      wx.showToast({
        title:"请勿过快操作",
        icon:'none'
      })
    }
  },
  jump(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "../pdctDetail/index?id=" + id
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
    console.log(this.data.list.length, this.data.total)
    if (this.data.list.length < this.data.total){
      this.data.page++
      let obj = {
        pdType: this.data.ncType,
        page: this.data.page,
        limit:3,
        keyWord: this.data.keyWord
      }
      this.getfurniture(obj)
    }
    
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})