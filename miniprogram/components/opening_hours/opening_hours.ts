

Component({
    properties: {
      opening_hours: {
        type: String,
        value: undefined,
      },
      dayparting: {
        type: String,
        value: undefined,
      },
    },
    data: {
      timeSelectVisible: false,
    },
    methods: {
      onTimeSelectTap: function () {
        this.setData({
          timeSelectVisible: true,
        })
      },
      onTimeSelectClose: function() {
          this.setData({
            timeSelectVisible: false,
          })
      },
      onTimeSelectConfirm: function() {
          if (!this.data.opening_hours) {
              this.setData({
                  //  @ts-ignore
                  dayparting: '00:00'
              })
          }
          this.setData({
            timeSelectVisible: false,
          })
      },
      onTimeChange(event: any) {
          const value = event.detail.getValues().join(':')
          this.setData({
            dayparting: value,
          })
      },
      
    }
  })
