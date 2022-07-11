// login.ts
import {
  getLocationInfo,
  clearLocationInfo,
} from '../../../utils/util'
import {MARK_TYPE_ON_STREET_SIDE} from '../../../common/index'
import {Request} from '../../../utils/request'
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
        chargeOptionList: [
            {name: '是', value: 1,},
            {name: '否  ', value: 0,},
        ],
        chargingMmethodOptionList: [
            {name: '人工', value: 1,},
            {name: '智能', value: 2,},
        ],
        areaLevelOptionList: [
          {name: '一类区', value: 1,},
          {name: '二类区', value: 2,},
          {name: '三类区', value: 3,},
        ],
        remarkAutoResizeOption: {
          maxHeight: 400,
          minHeight: 100
        },
        id: undefined,
        isReadonly: false,  //  是否可以编辑
        lng: '',    //  经度
        lat: '',    //  纬度
        address: '',    //  位置地址信息

        // 基本信息
        street: undefined, //  所属街道
        road_name: undefined, //   道路名称
        starting_point_investigation: undefined, //   调查起点
        survey_endpoint: undefined, //   调查终点
        number_road_lanes: undefined, //   道路车道数（双向共计）
        operation_management_unit: undefined, //   运营管理单位
        record_no: undefined, //   备案号

        // 停车位置
        east_side_the_road: false, //   道路东侧    选中1  不选中 0  提交的时候boolean转换为number
        east_side_the_road_number: undefined, //   道路东侧车道数量
        west_side_the_road: false, //   道路西侧
        west_side_the_road_number: undefined, //   道路西侧车道数量
        south_side_the_road: false, //   道路南侧
        south_side_the_road_number: undefined, //   道路南侧车道数量
        north_side_the_road: false, //   道路北侧
        north_side_the_road_number: undefined, //   道路北侧车道数量

        //  允许停放时间（单选）
        opening_hours: undefined, //  0-未知 1-全天开放2-分时段开放
        dayparting: undefined,

        //  收费方式及收费标准（小型车)
        is_charge_light_duty_vehicle: undefined,   //  是否收费 1-收费 0-否
        charging_method_light_duty_vehicle: undefined, //  收费方式  1-人工 2-智能
        area_level_light_duty_vehicle: undefined,//  区域等级
        first_period_hour_light_duty_vehicle: undefined, //   首时段
        first_period_hour_money_light_duty_vehicle: undefined, //  首时段小时元
        first_period_hour_per_light_duty_vehicle: undefined, //  每小时
        first_period_day_hour_money_light_duty_vehicle: undefined, //  白天后时段 首时段小时元
        first_period_day_hour_per_light_duty_vehicle: undefined, //  白天后时段 每小时
        first_period_night_hour_money_light_duty_vehicle: undefined, //  夜晚后时段 首时段小时元
        first_period_night_hour_per_light_duty_vehicle: undefined, //  夜晚后时段 每小时
        daily_maximum_charge_light_duty_vehicle: undefined, //   日最高收费
        other_light_duty_vehicle: undefined, //    其它

        // 收费方式及收费标准（大型车)
        is_charge_large_vehicle: undefined,   //  是否收费 1-收费 0-否
        charging_method_large_vehicle: undefined, //  收费方式  1-人工 2-智能
        area_level_large_vehicle: undefined,//  区域等级
        first_period_hour_large_vehicle: undefined, //   首时段
        first_period_hour_money_large_vehicle: undefined, //  首时段小时元
        first_period_hour_per_large_vehicle: undefined, //  每小时
        first_period_day_hour_money_large_vehicle: undefined, //  白天后时段 首时段小时元
        first_period_day_hour_per_large_vehicle: undefined, //  白天后时段 每小时
        first_period_night_hour_money_large_vehicle: undefined, //  夜晚后时段 首时段小时元
        first_period_night_hour_per_large_vehicle: undefined, //  夜晚后时段 每小时
        daily_maximum_charge_large_vehicle: undefined, //   日最高收费
        other_large_vehicle: undefined, //    其它

        //  停车需求信息
        first_recording_time: undefined, //   第一次记录时间   
        first_number_of_crossed_stops: undefined,   //  第一次划线停车数(辆)
        first_number_of_unmarked_stops: undefined, //   第一次未划线停车数(辆)
        peak_recording_time: undefined, //  高峰期记录时间
        peak_number_of_crossed_stops: undefined,  //  高峰期划线停车数(辆)
        peak_number_of_unmarked_stops: undefined,   //  未划线停车数(辆)

        //  上传照片
        images: [
          // {url: 'http://gmap.dev.zhangxinkeji.com/uploads/20220709/1910c2210c4860986463beb00f2fd671.png'},
        ],
        remark: undefined, //   备注
    },
    onLoad(options: any) {
      const {id} = options
      if (id) {
        // 编辑
        const that = this
        Request({
          url: '/api/tag/info',
          data: {
            id,
            type: MARK_TYPE_ON_STREET_SIDE,
          },
          method: 'GET',
          successCallBack: (res: any) => {
            const data = res.data || {}
            const images = data.images || ''
            if (images) {
              data.images = images.split(',').map((url: string) => ({url}))
            }
            const {
                east_side_the_road,
                west_side_the_road,
                south_side_the_road,
                north_side_the_road,
            } = data
            that.setData({
              ...data,
              east_side_the_road: !!east_side_the_road,
              west_side_the_road: !!west_side_the_road,
              south_side_the_road: !!south_side_the_road,
              north_side_the_road: !!north_side_the_road,
            })
          }
        })
        return
      }
      // 新增
      const locationInfo = getLocationInfo()
      if (locationInfo) {
        this.setData({
          ...locationInfo,
        })
      }
    },
    onEastSideChange (event: any) {
        this.setData({
            east_side_the_road: event.detail,
        })
    },
    onWestSideChange (event: any) {
        this.setData({
            west_side_the_road: event.detail,
        })
    },
    onSouthSideChange (event: any) {
        this.setData({
            south_side_the_road: event.detail,
        })
    },
    onNorthSideChange (event: any) {
        this.setData({
            north_side_the_road: event.detail,
        })
    },
    onSubmitBtnTap: function () {
        let {
          chargeOptionList,
          chargingMmethodOptionList,
          areaLevelOptionList,
          remarkAutoResizeOption,
          isReadonly,
          id,
          //  @ts-ignore
          create_time,
          //  @ts-ignore
          create_time_text,
          //  @ts-ignore
          update_time,
          //  @ts-ignore
          update_time_text,
          //  @ts-ignore
          free_time_text,
          //  @ts-ignore
          first_recording_time_text,
          //  @ts-ignore
          peak_recording_time_text,
          //  @ts-ignore
          user_id,
          //  @ts-ignore
          __webviewId__,

          east_side_the_road,
          west_side_the_road,
          south_side_the_road,
          north_side_the_road,

          ...query
        } = this.data
        console.log({
          query,
          data: this.data,
        })
        //  @ts-ignore
        query['east_side_the_road'] = east_side_the_road ? 1 : 0
        //  @ts-ignore
        query['west_side_the_road'] = west_side_the_road ? 1 : 0
        //  @ts-ignore
        query['south_side_the_road'] = south_side_the_road ? 1 : 0
        //  @ts-ignore
        query['north_side_the_road'] = north_side_the_road ? 1 : 0
        const images = (this.data.images || []).map(({url}) => url).join(',')
        query = {
            ...query,
            //  @ts-ignore
            images,
        }
        if (id) {
          query = {
            ...query,
            //  @ts-ignore
            id,
          }
        }
        
        Request({
          url: id ? '/api/tag/roadmod' : '/api/tag/roadadd',
          data: query,
          method: id ? "PUT" : 'POST',
          successCallBack: (data: any = {}) => {
            Toast.success(data.msg)
            if (!id) {
                clearLocationInfo()
            }
            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/mark_list/mark_list',
                })
            }, 500)
          }
        })

        
    },
    onImgChange (e: any) {
      const value = e.detail
      this.setData({
        images: value,
      })
      console.log({
        value,
      })
    }
})
