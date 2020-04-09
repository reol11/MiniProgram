import {getMultidata,getGoodsdata} from '../../service/home.js'

const types=['pop','new','sell']
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      "pop":{page:0,list:[]},
      "new":{page:0,list:[]},
      "sell":{page:0,list:[]}
    },
    currentType:'pop'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 请求轮播图和推荐的数据
      this._getMultidata()
      this._getGoodsdata("pop")
      this._getGoodsdata("sell")
      this._getGoodsdata("new")

    },
    _getMultidata(){
      getMultidata().then(res=>{
        const banners=res.data.data.banner.list;
        const recommends=res.data.data.recommend.list;
        this.setData({
         banners,
         recommends
        })
     })
    },
    _getGoodsdata(type){
      const page=this.data.goods[type].page + 1
      getGoodsdata(type,page).then(res=>{
          const list=res.data.data.list;
          const oldlist=this.data.goods[type].list;
          oldlist.push(...list)
         
          const typekey=`goods.${type}.list`
          const pagekey=`goods.${type}.page`
          this.setData({
            [typekey]:oldlist,
            [pagekey]:page  
          })
    })
    },
    handleTabClick(event){
       const index= event.detail.index
      
       this.setData({
        currentType:types[index]
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