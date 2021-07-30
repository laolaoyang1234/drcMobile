<template>
  <div class="viewPort">
    <van-nav-bar
      title="更多日报"
      left-arrow
      @click-left="$router.go(-1)"
      safe-area-inset-top
    />
    <div class="search">
      <!-- 日期 -->
      <Date ref="dateRef" @getTime="getTime" @getRadio="getRadio" />
      <!-- 状态 -->
      <div class="state">
        <State :state="state" />
      </div>
      <!-- 姓名 -->
      <van-row>
        <van-col span="11"> <Name :form="form" /></van-col>
        <van-col span="12" :offset="1"><KeyWords :form="form" /></van-col>
      </van-row>
      <!-- 搜索 -->
      <div class="btn">
        <van-button color="#0077FF" @click="search">搜索</van-button>
        <van-button color="#EEF5FF" @click="reset">重置</van-button>
      </div>
    </div>

    <div class="section">
      <div class="list">
        <!-- 列表项 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            clickable
            :label="item.date"
            v-for="item in infoList"
            :key="item.id"
          >
            <template #title>
              <span class="report"> [日报]</span>
              <span class="name"> {{ item.name }}</span>
              <span class="focus" v-show="item.focus"
                ><van-icon name="like" color="#F95555"
              /></span>
            </template>
            <template #default>
              <p class="depart">总部</p>
              <p class="depart">{{ item.depart }}</p>
            </template>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import Date from '@/views/sltotal/components/date.vue'
import State from '@/views/sltotal/components/state.vue'
import Name from '@/views/sltotal/components/name.vue'
import KeyWords from '@/views/sltotal/components/keywords.vue'
export default {
  components: {
    Date,
    State,
    Name,
    KeyWords
  },
  data () {
    return {
      infoList: [
        { id: 1, depart: '企业信息化部', focus: true, name: '吴亦凡', date: '2021-09-08' },
        { id: 2, depart: '企业信息化部', focus: true, name: '吴亦fan', date: '2021-09-08' },
        { id: 3, depart: '产品解决方案中心', focus: true, name: '吴e反', date: '2021-09-08' },
        { id: 4, depart: '市场部', focus: false, name: '吴亦反', date: '2021-09-08' },
        { id: 5, depart: '人力资源部', focus: false, name: '吴亦fn', date: '2021-09-08' }
      ],
      // 时间选择
      time: [],
      // 时间状态选择
      radio: '',
      // 已批阅未批阅状态
      state: {
        haveRead: '',
        noRead: ''
      },
      // 姓名
      form: {
        userName: '',
        keyWords: ''
      },
      // 下拉加载
      loading: false,
      finished: false
    }
  },
  methods: {
    // 获得子组件的时间
    getTime (val) {
      this.time = val
    },
    // 获得子组件的状态
    getRadio (val) {
      this.radio = val
    },
    // 重置
    reset () {
      this.time = []
      this.radio = ''
      this.$refs.dateRef.resetTime()
      this.form = {}
      this.state = {}
    },
    // 下拉加载
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.infoList.push(this.infoList.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.infoList.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    // search搜索
    search () {

    }
  }
}
</script>

<style lang="less" scoped>
.viewPort {
  // padding-top: 44px;

  ::v-deep .van-nav-bar__title {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 25px;
  }
  ::v-deep .van-nav-bar .van-icon {
    color: #000 !important;
  }
  // 搜索
  .search {
    height: 280px;
    width: 100%;
    border: 8px solid #fafbfe;
    border-left: none;
    border-right: none;
    padding: 18px 16px 19px 17px;
    .state {
      margin-top: 35px;
      margin-bottom: 31px;
    }
    ::v-deep .van-cell {
      padding: 0;
    }
    .btn {
      // 搜索
      margin-top: 8px;
      float: right;
      ::v-deep .van-button {
        width: 104px;
        height: 34px;
        &:nth-child(2) {
          margin-left: 11px;
          color: #0077ff !important;
        }
      }
    }
  }

  // 列表
  .section {
    width: 100%;
    padding: 0 16px;

    ::v-deep .van-cell {
      padding: 11px 4px;
      &::after {
        right: 0;
        left: 0;
        border-color: #f0f8f9;
      }
      .report {
        color: #2768ff;
        font-size: 14px;
        font-weight: 600;
      }
      .name {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 700;
        color: #0e1728;
        line-height: 20px;
      }
      .focus {
        float: right;
        margin-right: 50px;
        margin-top: 1px;
        vertical-align: middle;
      }
      .depart {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 20px;
      }
    }
  }
}
</style>
