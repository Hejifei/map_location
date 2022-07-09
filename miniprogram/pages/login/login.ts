// login.ts
import {setUserToken, parseApiUrl,} from '../../utils/util'
import Toast from '@vant/weapp/toast/toast';


Page({
  data: {
    name: 'lebwade',
    password: '111111',
  },
  onLoad() {
    
  },
  onLoginBtnTap: function() {

    wx.request({
      url: parseApiUrl('/api/user/login'), //仅为示例，并非真实的接口地址
      data: {
        account: this.data.name,
        password: this.data.password,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res: any) {

        if (res.data.code === 1) {
          // 登录成功
          const token = res.data.data.userinfo.token
          setUserToken(token)
          wx.navigateTo({
              url: '../index/index',
          })
        } else {
          Toast.fail(res.data.msg)
        }
      }
    })
    
  }
})
