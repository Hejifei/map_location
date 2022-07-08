// index.ts
import {PLUGIN_KEY, CDN_PATH} from '../../config/appConfig.js';
const LocationIcon =  '../../assets/imgs/location_icon.png'
import QQMapWX from '../../utils/qqmap-wx-jssdk.min.js';

const defaultMarkConfig = {
    id: 0,
    iconPath: `${CDN_PATH}/Marker3_Activated@3x.png`,
    // iconPath: LocationIcon,
    latitude: 31.32,
    longitude: 120.62,
    width: 30,
    height: 30,
    // width: 20,
    // height: 20
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
        isLogin: false,
        isRegionChanged: false, //  视野是否变换,若变化了,显示mark并设置中心点坐标为标注点
        isLoginedIn: false,
        markers: [defaultMarkConfig],
    },
    onLoginBtnTap() {
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
        var that = this
        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
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
    // 监听视野变化
    onChangeRegion(event: any) {
        if (event.type === 'end' && event.causedBy === 'drag') {
            const mapCtx = wx.createMapContext('map', this);
            mapCtx.getCenterLocation({
                success: res => {
                    const latitude = res.latitude;
                    const longitude = res.longitude;
                    console.log({res})
                    this.setData({
                        // regionCallbackTxt: '中心点坐标：' + latitude.toFixed(6) + ',' + longitude.toFixed(6),
                        location: {
                            latitude: latitude,
                            longitude: longitude,
                        },
                        isRegionChanged: true,
                        markers: [{
                            ...defaultMarkConfig,
                            latitude: latitude,
                            longitude: longitude,
                        }]
                    });
                }
            });
        }
    },
    // poi点击回调
    onTapPoi(event: any) {
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
                ...defaultMarkConfig,
                latitude: latitude,
                longitude: longitude,
            }]
        });
    },
    reverseLatLonToAddress() {
        const that = this
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: that.data.location.latitude,
                longitude: that.data.location.longitude,
            }, //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
            //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
            success: function (res: any) {//成功后的回调
                var res = res.result;
                var mks = [];

                //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
                mks.push({ // 获取返回结果，放到mks数组中
                    ...defaultMarkConfig,
                    latitude: that.data.location.latitude,
                    longitude: that.data.location.longitude,

                    title: res.address,
                    callout: { //在markers上展示地址名称，根据需求是否需要
                        content: res.address,
                        color: '#000',
                        display: 'ALWAYS'
                    }
                });
                that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
                    markers: mks,
                    // poi: {
                    //   latitude: res.location.lat,
                    //   longitude: res.location.lng
                    // }
                });
            },
            fail: function (error: any) {
                console.error(error);
            },
            complete: function (res: any) {
                console.log(res);
            }
        })
    }
})
