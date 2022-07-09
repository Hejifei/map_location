// login.ts
import { setUserInfo } from '../../../utils/util'


Page({
    data: {
        buildingTypeList: [
            {name: '中/高层住宅（7层以上）'},
            {name: '多层住宅'},
            {name: '自建房'},
            {name: '别墅'},
            {name: '其他'},
        ],
        chargeOptionList: [
            {name: '是', value: 1,},
            {name: '否  ', value: 0,},
        ],
        chargingMmethodOptionList: [
            {name: '人工', value: 1,},
            {name: '智能', value: 2,},
        ],
        isTimeSelectVisible: false,
        isReadonly: false,  //  是否可以编辑
        lng: '',    //  经度
        lat: '',    //  纬度
        address: '',    //  位置地址信息
        // 选择建筑类型（单选）
        building_type: undefined,  //  建筑类型

        // 小区基本信息
        community_name: undefined, //  小区名称
        residential_building_area: undefined, //   住宅建筑面积(平方米)
        year_built: undefined, //   建成年份
        total_number_houses: undefined, //   房屋总套数
        total_number_suites_occupied: undefined, //   已入住总套数

        // 配建（划线）停车位情况
        underground_parking_space: undefined, //   地下停车位
        ground_parking_space: undefined, // 地上停车位
        total_parking_space: undefined, //  总停车位
        including_open_parking_spaces: undefined, //  其中对外开放车位

        // 收费方式及收费标准（拍摄停车收费公示牌照片)
        is_charge: undefined,   //  是否收费 1-收费 0-否
        charging_method: undefined, //  收费方式  1-人工 2-智能
        barrier_brand: undefined, //    道闸品牌
        monthly_charge: undefined, //  包月收费(元/月)
        free_time: undefined, //   免费时长(分钟)
        charge_per_time_during_the_day: undefined, //   白天按次收费(元/次)
        charge_on_time_during_the_day: undefined, //   白天按时收费(元/小时)
        charge_per_night: undefined, //   夜间按次收费(元/次)
        charge_on_time_at_night: undefined, //   夜间按时收费(元/小时)
        other: undefined, //    其它

        //  停车需求信息
        first_recording_time: undefined, //   第一次记录时间   
        first_number_of_crossed_stops: undefined,   //  第一次划线停车数(辆)
        first_number_of_unmarked_stops: undefined, //   第一次未划线停车数(辆)
        // : undefined, //   
    },
    onLoad() {

    },
    onSubmitBtnTap: function () {

        console.log({
            ...this.data,
        })

        // wx.navigateTo({
        //     url: '../index/index',
        // })
    },
    onTimeSelectTap: function () {
        this.setData({
            isTimeSelectVisible: true,
        })
    },
    onTimeSelectClose: function() {
        this.setData({
            isTimeSelectVisible: false,
        })
    },
    onTimeSelectConfirm: function() {
        if (!this.data.first_recording_time) {
            this.setData({
                //  @ts-ignore
                first_recording_time: '00:00'
            })
        }
        this.setData({
            isTimeSelectVisible: false,
        })
    },
    onTimeChange(event: any) {
        const value = event.detail.getValues().join(':')
        this.setData({
            first_recording_time: value,
        })
    }
})
