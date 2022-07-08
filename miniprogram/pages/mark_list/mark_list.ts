import {MARK_TYPE_MAP} from '../../common/index';

Page({
  data: {
    markerList: [
        {
            id: 1,
            type: 1,
            address: '江苏省苏州市相城区福元路何静峰会88号',
            userName: 'xxxx',
            time: '2022.01.01 13:00',
            typeInfo: MARK_TYPE_MAP[1],
        },
        {
            id: 2,
            type: 2,
            address: '江苏省苏州市相城区福元路何静峰会88号',
            userName: 'xxxx',
            time: '2022.01.01 13:00',
            typeInfo: MARK_TYPE_MAP[2],
        },
    ],
  },
  onLoad() {
    
  },
})
