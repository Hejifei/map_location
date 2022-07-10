// index.ts
import {PLUGIN_KEY, CDN_PATH} from '../../config/appConfig.js';
import {getUserToken, setLocationInfo} from '../../utils/util';
// const LocationIcon =  '../../assets/imgs/location_icon.png'
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
        // isLogin: true,
        isRegionChanged: false, //  视野是否变换,若变化了,显示mark并设置中心点坐标为标注点
        // isLoginedIn: true,
        isLoginedIn: false,
        markers: [defaultMarkConfig],
        timer: 0,
    },
    onLoginBtnTap() {
        wx.navigateTo({
            url: '../login/login',
        })
    },
    onMarkAddBtnTap() {
        wx.navigateTo({
            url: '../mark_list/mark_list',
        })
    },
    onLoad() {
      this.setData({
        isLoginedIn: getUserToken(),
      })
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

    },
    // 监听视野变化
    onChangeRegion(event: any) {
        if (this.data.timer) {
            clearTimeout(this.data.timer)
        }
        if (event.type === 'end' && event.causedBy === 'drag') {
            const mapCtx = wx.createMapContext('map', this);
            mapCtx.getCenterLocation({
                success: res => {
                    const latitude = res.latitude;
                    const longitude = res.longitude;
                    console.log({res})
                    this.setData({
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
                    }, () => {
                        this.addMarkTextEvent();
                    });
                }
            });
        }
    },
    //  移动0.5秒后显示立即标点文字
    addMarkTextEvent() {
        const markers = this.data.markers
        const firstMarker = markers[0]
        const timer = setTimeout(() => {
            this.setData({
                markers: [{
                    ...firstMarker,
                    //  @ts-ignore
                    callout: {
                        display: 'ALWAYS',
                        content: '立即标点 >',
                        color: '#fff',
                        fontSize: 12,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: '#2C6DFF',
                        bgColor: '#2C6DFF',
                        padding: 6,
                    }
                }]
            })
        }, 500)
        this.setData({
            timer,
        })
    },
    // poi点击回调
    onTapPoi(event: any) {
        if (this.data.timer) {
            clearTimeout(this.data.timer)
        }
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
        }, () => {
            this.addMarkTextEvent();
        });
    },
    onAddMarkerTap() {
        const that = this
        console.log('立即标点')
        qqmapsdk.reverseGeocoder({
            location: {
                latitude: that.data.location.latitude,
                longitude: that.data.location.longitude,
            }, //获取表单传入的位置坐标,不填默认当前位置,示例为string格式
            //get_poi: 1, //是否返回周边POI列表：1.返回；0不返回(默认),非必须参数
            success: function (res: any) {//成功后的回调
                var res = res.result;
                const address = res.address;
                console.log({address})
                // var mks = [];
                setLocationInfo({
                  lng: that.data.location.longitude,
                  lat: that.data.location.latitude,
                  address,
                })
                wx.navigateTo({
                  url: '../type_select/type_select',
                })

                //当get_poi为0时或者为不填默认值时，检索目标位置，按需使用
                // mks.push({ // 获取返回结果，放到mks数组中
                //     ...defaultMarkConfig,
                //     latitude: that.data.location.latitude,
                //     longitude: that.data.location.longitude,

                //     title: res.address,
                //     callout: { //在markers上展示地址名称，根据需求是否需要
                //         content: res.address,
                //         color: '#000',
                //         display: 'ALWAYS'
                //     }
                // });
                // that.setData({ //设置markers属性和地图位置poi，将结果在地图展示
                //     markers: mks,
                //     // poi: {
                //     //   latitude: res.location.lat,
                //     //   longitude: res.location.lng
                //     // }
                // });
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
