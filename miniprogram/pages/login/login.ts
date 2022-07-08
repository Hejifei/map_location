// login.ts
import {setUserInfo} from '../../utils/util'


Page({
  data: {
    name: '',
    password: '',
  },
  onLoad() {
    
  },
  onLoginBtnTap: function() {

    console.log({
        ...this.data,
    })
    setUserInfo({
        ...this.data,
    })
    wx.navigateTo({
        url: '../index/index',
    })
  }
})
