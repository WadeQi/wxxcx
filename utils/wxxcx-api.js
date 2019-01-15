function base(ctx){
  ctx.showToast = (icon,msg)=>{
    wx.showToast({
      icon: icon,
      title: msg,
    })
  }
}
module.exports = base