import {
  MARK_TYPE_MAP,
  MARK_TYPE_LIST,
} from '../../common/index';
import {Request} from '../../utils/request'

Page({
  data: {
    MARK_TYPE_LIST,
    activeTab: undefined,
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
    showDataList: []
  },
  onLoad() {
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
        console.log({
            list,
        })
        that.setData({
          //  @ts-ignore
          markerList: list,
          showDataList: list,
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
  onTabChange(event: any) {
    const value = event.detail.name
      console.log({
          event,
          name: event.detail.name,
      })
      this.setData({
        showDataList: this.data.markerList.filter(item => value ? item.type === value : true)
      })
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },
})
