// index.ts
// 获取应用实例
const app = getApp<IAppOption>()


export const CDN_PATH = 'https://3gimg.qq.com/lightmap/xcx/demoCenter/images';

Page({
  data: {
    motto: 'Hellow 小程序',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    location: {
        latitude: 40.040415,
        longitude: 116.273511,
    },
    showPosition: true,
    isLocationPersionAllowed: false,
    isLogin: false,
    isRegionChanged: false, //  视野是否变换,若变化了,显示mark并设置中心点坐标为标注点
    markers: [
      {
        id: 0,
        iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
        latitude: 40.040415,
        longitude: 116.273511,
        width: 30,
        height: 30
      }
    ],
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    var that = this
    wx.getLocation({
        type: 'gcj02',
        success: function (res) {
            console.log({res})
            that.setData({
                location: {
                    latitude: res.latitude,
                    longitude: res.longitude,
                },
                isLocationPersionAllowed: true,
            })
        },
    })
    // const key = 'AZDBZ-YA66F-E4GJH-JM5A5-5RUNE-ETFAQ'; //使用在腾讯位置服务申请的key
    // const referer = '地图定位'; //调用插件的app的名称
    // const location = JSON.stringify({
    // latitude: this.data.latitudes,
    // longitude: this.data.longitudes
    // });
    // const category = '生活服务,娱乐休闲';
    
    // wx.navigateTo({
    // url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
    // });

  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 监听视野变化
	onChangeRegion (event: any) {
		if (event.type === 'end' && event.causedBy === 'drag') {
			const mapCtx = wx.createMapContext('map', this);
			mapCtx.getCenterLocation({
				success: res => {
					const latitude = res.latitude;
					const longitude = res.longitude;
					this.setData({
						// regionCallbackTxt: '中心点坐标：' + latitude.toFixed(6) + ',' + longitude.toFixed(6),
            location: {
              latitude: latitude,
              longitude: longitude,
            },
            isRegionChanged: true,
            markers: [{
              id: 0,
              iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
              latitude: latitude,
              longitude: longitude,
              width: 30,
              height: 30
            }]
					});
				}
			});
		}
	},
  // poi点击回调
	onTapPoi (event: any) {
		// const name = event.detail.name.length <= 8 ? event.detail.name : event.detail.name.substring(0, 8)+'...';
		const latitude = event.detail.latitude;
		const longitude = event.detail.longitude;
		this.setData({
			// poiCallbackTxt: name + '：' + latitude.toFixed(6) + ',' + longitude.toFixed(6)
      location: {
        latitude: latitude,
        longitude: longitude,
      },
      isRegionChanged: true,
      markers: [{
        id: 0,
        iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
        latitude: latitude,
        longitude: longitude,
        width: 30,
        height: 30
      }]
		});
	},
})
