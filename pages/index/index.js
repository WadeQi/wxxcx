//index.js
//获取应用实例
import * as watch from '../../utils/watch.js'
import wxapi from '../../utils/wxxcx-api.js'
const app = getApp()

Page({
  data: {
    watch:true
  },
  onLoad: function () {
    watch.setWatcher(this)
    console.log(wxapi)
    wxapi(this)
  },
  watch:{
    'watch':function(val,newval){
      this.showToast("none","监听到watch的变化了")
    },
  },
  watchHandle(){
    this.setData({
      watch: !this.data.watch
    })
  }
})
