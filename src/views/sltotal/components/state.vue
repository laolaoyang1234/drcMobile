<template>
  <div class="viewPort">
    <van-row>
      <van-col span="4">状态:</van-col>
      <van-col span="8"
        ><van-checkbox v-model="state.haveRead" shape="square"
          >未批阅</van-checkbox
        ></van-col
      >
      <van-col span="8"
        ><van-checkbox v-model="state.noRead" shape="square"
          >已批阅</van-checkbox
        ></van-col
      >
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  },
  watch: {
    'state.haveRead' (newVal) {
      if (newVal) {
        this.state.noRead = false
      }
    },
    'state.noRead' (newVal) {
      if (newVal) {
        this.state.haveRead = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.viewPort {
  background-color: #fff !important;
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #0e1728;
  line-height: 22px;
  ::v-deep .van-checkbox__label {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 20px;
  }
}
</style>
