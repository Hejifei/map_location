

Component({
    properties: {
      first_recording_time: {
        type: String,
        value: undefined,
      },
      first_number_of_crossed_stops: {
        type: String,
        value: undefined,
      },
      first_number_of_unmarked_stops: {
        type: String,
        value: undefined,
      },
      peak_recording_time: {
        type: String,
        value: undefined,
      },
      peak_number_of_crossed_stops: {
        type: String,
        value: undefined,
      },
      peak_number_of_unmarked_stops: {
        type: String,
        value: undefined,
      },
      // imgList: {
      //     type: Array,
      //     value: [],
      // }
    },
    data: {
      isFirstTimeSelectVisible: false,
      isPeakTimeSelectVisible: false,
    },
    methods: {
      onFirstTimeSelectTap: function () {
        this.setData({
          isFirstTimeSelectVisible: true,
        })
      },
      onFirstTimeSelectClose: function() {
          this.setData({
            isFirstTimeSelectVisible: false,
          })
      },
      onFirstTimeSelectConfirm: function() {
          if (!this.data.first_recording_time) {
              this.setData({
                  //  @ts-ignore
                  first_recording_time: '00:00'
              })
          }
          this.setData({
            isFirstTimeSelectVisible: false,
          })
      },
      onFirstTimeChange(event: any) {
          const value = event.detail.getValues().join(':')
          this.setData({
              first_recording_time: value,
          })
      },
      onPeakTimeSelectTap: function () {
        this.setData({
          isPeakTimeSelectVisible: true,
        })
      },
      onPeakTimeSelectClose: function() {
          this.setData({
            isPeakTimeSelectVisible: false,
          })
      },
      onPeakTimeSelectConfirm: function() {
          if (!this.data.first_recording_time) {
              this.setData({
                  //  @ts-ignore
                  peak_recording_time: '00:00'
              })
          }
          this.setData({
            isPeakTimeSelectVisible: false,
          })
      },
      onPeakTimeChange(event: any) {
          const value = event.detail.getValues().join(':')
          this.setData({
            peak_recording_time: value,
          })
      },
    }
  })
