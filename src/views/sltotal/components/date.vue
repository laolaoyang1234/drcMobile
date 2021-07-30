<template>
  <div class="viewPort">
    <van-radio-group v-model="radio" direction="horizontal">
      <van-row>
        <van-col class="label">日期:</van-col>
        <van-col span="5.2"><van-radio name="1">本周</van-radio></van-col>
        <van-col span="5.2"> <van-radio name="2">上周</van-radio></van-col>
        <van-col span="5.2"><van-radio name="3">本月</van-radio></van-col>
        <van-col span="5.2"><van-radio name="4">上月</van-radio></van-col>
      </van-row>
      <van-radio name="5">自定义</van-radio>
      <div class="picker" @click="showStartTimeFn">
        <img src="@/assets/image/calendar.png" alt="" />
        <template v-if="time.start">
          {{ formatCurrentStartDate }}
        </template>
        <template v-else> <span style="color: #999999">请选择</span> </template>
      </div>
      <span class="line">-</span>
      <div class="picker" @click="showEndTimeFn">
        <img src="@/assets/image/calendar.png" alt="" />
        <template v-if="time.end">
          {{ formatCurrentEndDate }}
        </template>
        <template v-else> <span style="color: #999999">请选择</span> </template>
      </div>
    </van-radio-group>
    <!-- 选择开始时间 -->
    <van-popup
      v-model="showStartTime"
      position="bottom"
      :style="{ height: '50%' }"
      @open="currentStartDate = time.start"
    >
      <van-datetime-picker
        v-model="currentStartDate"
        type="date"
        title="选择开始时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmStartDate"
        @cancel="showStartTime = false"
      />
    </van-popup>
    <!-- 选择结束时间 -->
    <van-popup
      v-model="showEndTime"
      position="bottom"
      :style="{ height: '50%' }"
      @open="currentEndDate = time.end"
    >
      <van-datetime-picker
        v-model="currentEndDate"
        type="date"
        title="选择结束时间"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmEndDate"
        @cancel="showEndTime = false"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      // 单选框的值
      radio: '0',
      // 最终选择的时间
      time: {
        start: '',
        end: ''
      },
      // 是否显示开始时间弹框
      showStartTime: false,
      // 是否显示结束时间弹框
      showEndTime: false,
      // 当前开始时间
      currentStartDate: '',
      // 结束时间
      currentEndDate: '',
      // 最大最小值
      minDate: new Date(2020, 7, 1),
      maxDate: new Date()
    }
  },
  methods: {
    // 点击开始时间
    showStartTimeFn () {
      this.radio = '5'
      this.showStartTime = true
      this.currentStartDate = new Date()
    },
    // 点击结束时间
    showEndTimeFn () {
      this.radio = '5'
      this.showEndTime = true
      this.currentEndDate = new Date()
    },
    // 确认开始时间
    confirmStartDate () {
      if (this.time.end && this.currentStartDate > this.time.end) return this.$toast('开始时间应小于结束时间')
      this.time.start = this.currentStartDate
      this.showStartTime = false
      if (!this.time.end) this.showEndTime = true
    },
    // 确认结束时间
    confirmEndDate () {
      if (this.time.start && this.currentEndDate < this.time.start) return this.$toast('结束时间应大于开始时间')
      this.time.end = this.currentEndDate
      this.showEndTime = false
      if (!this.time.start) this.showStartTime = true
    },
    // 重置时间
    resetTime () {
      this.radio = '0'
      this.time = { start: '', end: '' }
      this.currentStartDate = ''
      this.currentEndDate = ''
    }

  },
  computed: {
    // 渲染到模板
    formatCurrentStartDate () {
      return dayjs(this.time.start).format('YYYY-MM-DD')
    },
    formatCurrentEndDate () {
      return dayjs(this.time.end).format('YYYY-MM-DD')
    }
  },
  watch: {
    'radio' (newVal) {
      const num = Number(newVal)
      if (num < 5) {
        this.time = { start: '', end: '' }
        this.$emit('getTime', [])
        this.$emit('getRadio', newVal)
      } else {
        this.showStartTime = true
        this.$emit('getRadio', newVal)
      }
    },
    time: {
      deep: true,
      handler (val) {
        if (val.end && val.start) {
          this.$emit('getTime', [val.start, val.end])
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.viewPort {
  ::v-deep .van-radio-group--horizontal {
    background-color: #fff;
  }
  ::v-deep .van-icon-success {
    text-align: center;
    line-height: 50%;
  }
  ::v-deep .van-radio__icon {
    font-size: 18px;
  }
  ::v-deep .van-radio__icon .van-icon {
    width: 18px;
    height: 18px;
  }
  ::v-deep .van-radio__icon--checked .van-icon {
    background-color: #fff;
    border: 6px solid #0077ff;
  }
  ::v-deep .van-icon-success::before {
    content: "";
  }

  ::v-deep .van-col .van-radio--horizontal {
    margin-left: 8px;
  }
  .label {
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #0e1728;
    line-height: 18px;
    margin-right: 15px;
    margin-bottom: 16px;
  }
  ::v-deep .van-radio__label {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    margin-left: 10px;
  }
  // 日期选择
  .picker {
    width: 110px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
    padding-bottom: 5px;
    margin-left: 10px;
    border-bottom: 2px solid #d6dadd;
    img {
      width: 16px;
      height: 18px;
      vertical-align: text-top;
      margin-right: 3px;
    }
  }
  .line {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #83858e;
    line-height: 20px;
    margin: 0 3px 0 8px;
  }
}
</style>
