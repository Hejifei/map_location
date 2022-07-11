import {
  MARK_TYPE_MAP,
} from '../../common/index';
import {Request} from '../../utils/request'

Page({
  data: {
    markerList: [
        // {
        //     id: 1,
        //     type: 1,
        //     address: '江苏省苏州市相城区福元路何静峰会88号',
        //     userName: 'xxxx',
        //     time: '2022.01.01 13:00',
        //     typeInfo: MARK_TYPE_MAP[1],
        // },
        // {
        //     id: 2,
        //     type: 2,
        //     address: '江苏省苏州市相城区福元路何静峰会88号',
        //     userName: 'xxxx',
        //     time: '2022.01.01 13:00',
        //     typeInfo: MARK_TYPE_MAP[2],
        // },
    ],
  },
  onLoad() {
    const that = this
    Request({
      url: '/api/tag/index',
      data: {
        page: 1,
        pagesize: 99,
      },
      method: 'GET',
      successCallBack: (res: any) => {
        const {list: data} = res.data
        const list = data.map((item: any) => ({
          ...item,
          typeInfo: MARK_TYPE_MAP[item.type]
        }))
        that.setData({
          //  @ts-ignore
          markerList: list,
        })
      }
    })
  },
  onMarkDetailTap (e: any) {
    const dataset = e.currentTarget.dataset
    const {url, id} = dataset
    wx.navigateTo({
      url: `${url}?id=${id}`,
    })
  },
  onMarkLocationTap (e: any) {
    const dataset = e.currentTarget.dataset
    const {lat, lng, address} = dataset
    wx.navigateTo({
      url: `/pages/index/index?address=${address}&lat=${lat}&lng=${lng}`,
    })
  },
})
