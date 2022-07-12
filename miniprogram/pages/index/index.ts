// index.ts
import {PLUGIN_KEY, CDN_PATH} from '../../config/appConfig.js';
import {getUserToken, setLocationInfo} from '../../utils/util';
import {Request} from '../../utils/request'
import {MARK_TYPE_MAP} from '../../common/index'
// const LocationIcon =  '../../assets/imgs/location_icon.png'
import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js';

// const MARK_NOW_URL = 'https://636c-cloud1-2grtkpnv263496be-1307461040.tcb.qcloud.la/mark_now.png?sign=58e307bd49226e9dd78b0d8a5e354a0a&t=1657528230'
// const MARK_NOW_URL = '../../assets/imgs/mark_now.png'
const MARK_NOW_URL = 'https://gmap.dev.zhangxinkeji.com/uploads/20220711/5f050d1628aed54c766e8f0d11ea434c.png'

const defaultMarkConfig = {
    id: 0,
    // iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
    iconPath: MARK_NOW_URL,
    latitude: 31.32,
    longitude: 120.62,
    // width: 30,
    // height: 30,
    width: 80,
    height: 36,
    // callout: {
    //     display: 'ALWAYS',
    //     content: '立即标点 >',
    //     color: '#fff',
    //     fontSize: 12,
    //     borderRadius: 4,
    //     borderWidth: 1,
    //     borderColor: '#2C6DFF',
    //     bgColor: '#2C6DFF',
    //     padding: 6,
    // }
}

const qqmapsdk = new QQMapWX({
    key: PLUGIN_KEY // 必填
});
// 获取应用实例
// const app = getApp<IAppOption>()

Page({
    data: {
        location: {
            latitude: 31.32,
            longitude: 120.62,
        },
        showPosition: true,
        isLocationPersionAllowed: false,
        isReadOnly: false,
        // isLogin: true,
        isRegionChanged: false, //  视野是否变换,若变化了,显示mark并设置中心点坐标为标注点
        // isLogin: true,
        isLogin: false,
        // markers: [],
        markers: [],
        markDataList: [],
        options: undefined,
        timer: 0,
        animation: false,
        isLocationPickerVisible: false, //  定位选择是否显示
        isMarkerActivatedVisible: false,
    },
    onLoginBtnTap() {
        wx.navigateTo({
            url: '/pages/login/login',
        })
    },
    onMarkAddBtnTap() {
        wx.navigateTo({
            url: '../mark_list/mark_list',
        })
    },
    // onShow() {
    //     console.log('onShow')
    // },
    onHide() {
        this.setData({
            isLocationPickerVisible: false,
        })
    },
    onLoad(options: any) {
        const isLogin = getUserToken()
        this.setData({
            isLogin,
        })
        const {address, lat, lng} = options
        if (address && lat && lng) {
            this.setData({
                options,
            })
        }
        if (isLogin) {
            const that = this
            Request({
            url: '/api/tag/index',
            data: {
                page: 1,
                pagesize: 999,
            },
            method: 'GET',
            successCallBack: (res: any) => {
                const {list: data} = res.data
                const list = data.map((item: any) => ({
                    ...item,
                    typeInfo: MARK_TYPE_MAP[item.type]
                }))
                const markList = list.map((item) => ({
                    id: item.id,
                    iconPath: item.typeInfo.location_icon_url,
                    // iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
                    // iconPath: MARK_NOW_URL,
                    latitude: item.lat,
                    longitude: item.lng,
                    width: 16,
                    height: 20,
                    // width: 80,
                    // height: 36,
                    customCallout: {
                        display: 'BYCLICK',
                        anchorY: 0,
                        anchorX: 0,
                    },
                    // callout: {
                    //     display: 'BYCLICK',
                    //     content: item.address,
                    //     color: '#fff',
                    //     fontSize: 12,
                    //     borderRadius: 4,
                    //     borderWidth: 1,
                    //     borderColor: '#2C6DFF',
                    //     bgColor: '#2C6DFF',
                    //     padding: 6,
                    // }
                }))
                that.setData({
                    //  @ts-ignore
                    markers: markList,
                    markDataList: list,
                })
            }
            })
        }
    },
    onShow() {
        const {address, lat, lng} = (this.data.options || {}) as any
        var that = this
        if (address && lat && lng) {
            // wx.getLocation({
            //     type: 'gcj02',
            //     success: function () {
            that.setData({
                location: {
                    latitude: lat,
                    longitude: lng,
                },
                isReadOnly: true,
                isLocationPersionAllowed: false,
                // markers: [{
                //     id: 0,
                //     iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
                //     width: 30,
                //     height: 30,
                //     // iconPath: MARK_NOW_URL,
                //     // width: 80,
                //     // height: 36,
                //     // latitude: 31.32,
                //     // longitude: 120.62,
                    
                //     // ...defaultMarkConfig,
                //     latitude: lat,
                //     longitude: lng,
                //     //  @ts-ignore
                //     callout: {
                //         display: 'ALWAYS',
                //         content: address,
                //         color: '#fff',
                //         fontSize: 12,
                //         borderRadius: 4,
                //         borderWidth: 1,
                //         borderColor: '#2C6DFF',
                //         bgColor: '#2C6DFF',
                //         padding: 6,
                //     }
                // }]
            })
            //     },
            // })
            return
        }
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                that.setData({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    },
                    isReadOnly: false,
                    isLocationPersionAllowed: true,
                })
            },
        })

    },
    // 监听视野变化
    onChangeRegion(event: any) {
        if (this.data.isReadOnly) {
            return
        }
        if (this.data.timer) {
            clearTimeout(this.data.timer)
            this.data.timer = 0
        }
        const that = this
        if (event.type === 'begin' && event.causedBy === 'gesture') {
            this.setData({
                isLocationPickerVisible: true,
                isMarkerActivatedVisible: true,
            })
        }
        if (event.type === 'end' && event.causedBy === 'drag') {
            const mapCtx = wx.createMapContext('map', this);
            mapCtx.getCenterLocation({
                success: res => {
                    const latitude = res.latitude;
                    const longitude = res.longitude;
                    that.setData({
                        location: {
                            latitude: latitude,
                            longitude: longitude,
                        },
                        animation: true,
                        isMarkerActivatedVisible: false,
                        isRegionChanged: true,
                    });
                }
            });
        }
    },
    onMarkerAnimationend () {
		this.setData({
			animation: false
		});
	},
    // poi点击回调
    onTapPoi(event: any) {
        if (this.data.isReadOnly) {
            return
        }
        if (this.data.timer) {
            clearTimeout(this.data.timer)
            this.data.timer = 0
        }
        const latitude = event.detail.latitude;
        const longitude = event.detail.longitude;
        this.setData({
            location: {
                latitude: latitude,
                longitude: longitude,
            },
            isRegionChanged: true,
            animation: true,
            isMarkerActivatedVisible: false,
        });
    },
    onAddMarkerTap() {
        if (!this.data.isLogin) {
            wx.navigateTo({
                url: '/pages/login/login',
            })
            return
        }
        if (this.data.isReadOnly) {
            return
        }
        const that = this
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: that.data.location.latitude,
                longitude: that.data.location.longitude,
            }, //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
            //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
            success: function (res: any) {//成功后的回调
                var res = res.result;
                const address = res.address;
                // var mks = [];
                setLocationInfo({
                  lng: that.data.location.longitude,
                  lat: that.data.location.latitude,
                  address,
                })
                wx.navigateTo({
                  url: '../type_select/type_select',
                })
            },
            fail: function (error: any) {
                console.error(error);
            },
            complete: function (res: any) {
                console.log(res);
            }
        })
    },
    onMarkDetailTap (e: any) {
        const markerId = e.markerId
        const markerInfo = this.data.markDataList.filter((item: any) => item.id === markerId)[0]
        const {typeInfo, tag_id: id} = markerInfo
        const {url} = typeInfo
        wx.navigateTo({
          url: `${url}?id=${id}`,
        })
    },
})
