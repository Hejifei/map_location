import {MARK_TYPE_MAP} from '../../common/index';

Page({
  data: {
    typeList: Object.values(MARK_TYPE_MAP),
  },
  onLoad() {
    
  },
  changePageToForm: (e: any) => {
    const url = e.currentTarget.dataset.url
    wx.navigateTo({
      url,
  })
  } 
})
