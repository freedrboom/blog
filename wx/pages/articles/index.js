// pages/articles/index.js
import requests from "../../utils/requests"
import { localUrls } from "../../data/config"

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    requests
      .get("/articles")
      .then(res => {
        console.log({})
        app.globalData.posts = [...res]
        this.setData({
          postList: res,
        })
      })
      .catch(e => {
        console.log(e)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postid
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url: `${localUrls.articleDetail}?id=${postId}`,
    })
  },

  onSwiperTap: function(event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: `${localUrls.articleDetail}?id=${postId}`,
    })
  },
})
