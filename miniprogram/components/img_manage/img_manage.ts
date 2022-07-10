import { parseApiUrl, getUserToken } from "../../utils/util";
import {ERROR_CODE_NEED_LOGIN} from '../../common/index'
import Toast from '@vant/weapp/toast/toast';

Component({
    properties: {
      imgList: {
          type: Array,
          value: [],
      }
    },
    data: {
    },
    methods: {
      // 这里是一个自定义方法
      customMethod: function(){},
      beforeRead: function(event: any) {
        const { file, callback } = event.detail;
        console.log({
          file,
        })
        callback(file.type === 'image');
      },
      afterRead: function(event: any) {
        const { file } = event.detail;
        console.log({file})
        const that = this
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        wx.uploadFile({
          url: parseApiUrl('/api/upload/index'), // 仅为示例，非真实的接口地址
          filePath: file.url,
          name: 'file',
          header: {
            'content-type': 'application/json', // 默认值
            token: getUserToken()
          },
          // formData: { user: 'test' },
          success(res) {
            try {
              const dataString = res.data
              const data = JSON.parse(dataString)
              if (data.code === 0) {
                Toast.fail(data.msg)
                return
              }
              if (data.code === ERROR_CODE_NEED_LOGIN) {
                Toast.fail(data.msg)
                setTimeout(() => {
                  wx.navigateTo({
                    url: '../../login/login',
                  })
                }, 1000)
                return
              }
              const url = data.data.fullurl as String
              // 上传完成需要更新 fileList
              const { imgList = [] } = that.data
              //  @ts-ignore
              imgList.push({url})
              that.triggerEvent('onImgListChange', imgList)
            } catch (error) {
              console.log(error.message)
            }
          },
          fail(res) {
            Toast.fail(res.errMsg)
          }
        });
      },
      afterDelete: function(e: any) {
        const index = e.detail.index
        const { imgList = [] } = this.data
        imgList.splice(index, 1)
        this.triggerEvent('onImgListChange', imgList)
      }
    }
  })
