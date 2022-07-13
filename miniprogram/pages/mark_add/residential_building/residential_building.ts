
import {
  getLocationInfo,
  clearLocationInfo,
} from '../../../utils/util'
import {Request} from '../../../utils/request'
import Toast from '@vant/weapp/toast/toast';

Page({
    data: {
        buildingTypeList: [
            {value: 1, name: '中/高层住宅（7层以上）'},
            {value: 2, name: '多层住宅'},
            {value: 3, name: '自建房'},
            {value: 4, name: '别墅'},
            {value: 5, name: '其他'},
        ],
        chargeOptionList: [
            {name: '是', value: 1,},
            {name: '否  ', value: 0,},
        ],
        chargingMmethodOptionList: [
            {name: '人工', value: 1,},
            {name: '智能', value: 2,},
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
            type: 1,
          },
          method: 'GET',
          successCallBack: (res: any) => {
            const data = res.data || {}
            const images = data.images || ''
            if (images) {
              data.images = images.split(',').map((url: string) => ({url}))
            }
            that.setData({
              ...data,
              charging_method: data.charging_method ? `${data.charging_method}` : data.charging_method,
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
    onSubmitBtnTap: function () {
        let {
          buildingTypeList,
          chargeOptionList,
          chargingMmethodOptionList,
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
          ...query
        } = this.data
        console.log({
          query,
          data: this.data,
        })
        const images = (this.data.images || []).map(({url}) => url).join(',')
        query = {
            ...query,
            //  @ts-ignore
            images,
            //  @ts-ignore
            charging_method: query.charging_method ? (+query.charging_method) : query.charging_method,
        }
        if (id) {
          query = {
            ...query,
            //  @ts-ignore
            id,
          }
        }
        
        Request({
          url: id ? `/api/tag/livemod` : '/api/tag/liveadd',
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
    },
    onChargingMmethodChange(event: any) {
        const value = event.detail
        const oldValue = this.data.charging_method
        let currentSelectedValue = null
        if (!oldValue && value.length > 0) {
            currentSelectedValue = value[0]
        } else if (oldValue && value.length > 0) {
            const index = value.indexOf(oldValue)
            value.splice(index, 1)
            currentSelectedValue = value[0]
        }
        this.setData({
            charging_method: currentSelectedValue,
        });
    }
})
