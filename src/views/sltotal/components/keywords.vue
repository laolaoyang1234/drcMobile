<template>
  <div class="viewPort">
    <van-field
      label="关键字:"
      v-model="form.keyWords"
      placeholder="请输入关键字"
    />
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style lang="less" scoped>
.viewPort {
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: #0e1728;
  line-height: 22px;
  ::v-deep .van-field__label {
    width: 64px;
    font-size: 16px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: #0e1728;
    line-height: 22px;
  }
  ::v-deep .van-field__control {
    padding-bottom: 5px;
    border-bottom: 1px solid #d6dadd;
  }
}
</style>
