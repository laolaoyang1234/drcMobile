<template>
  <div class="viewPort">
    <!-- navbar -->
    <van-nav-bar
      title="我的日报记录"
      left-arrow
      @click-left="$router.go(-1)"
      safe-area-inset-top
    />
    <!-- 搜索组件 -->
    <div class="search">
      <!-- 日期 -->
      <Date ref="dateRef" @getTime="getTime" @getRadio="getRadio" />
      <!-- 状态 -->
      <div class="state">
        <State :state="state" />
      </div>
      <van-row>
        <van-col span="24"><KeyWords :form="form" /></van-col>
      </van-row>
      <!-- 搜索 -->
      <div class="btn">
        <van-button color="#0077FF" @click="search">搜索</van-button>
        <van-button color="#EEF5FF" @click="reset">重置</van-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, i) in list"
          :key="i"
          :class="{ lis: !item.haveRead }"
        >
          <!-- 日报 -->
          <span class="name">{{ item.name }}</span>
          <!-- 时间 -->
          <span class="date"
            >{{ item.date }}
            <!-- 是否补发(此为已阅的补发样式) -->
            <span class="late" v-if="item.haveRead && item.late">[补]</span>
          </span>
          <!-- 评语, 只有已阅才会有 -->
          <span class="info" v-if="item.count > 0">
            <img src="@/assets/image/comments.png" alt="" />
            <span>{{ item.count }}</span>
          </span>

          <!-- 是否补发(此为未阅云草稿的补发样式) -->
          <span class="late-n" v-if="!item.haveRead && item.late">[补]</span>
          <!-- 已阅未阅云草稿分类 -->
          <div class="read" v-if="item.haveRead">已阅</div>

          <!-- 未阅云草稿布局 -->
          <div class="noRead" v-if="!item.haveRead">
            <span class="read-n" v-if="item.noRead"> 未阅 </span>
            <span class="read-c" v-else> 云草稿 </span>
            <div class="btn-group">
              <span class="edit">编辑</span>
              <span class="del">删除</span>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import Date from '@/views/sltotal/components/date.vue'
import State from '@/views/sltotal/components/state.vue'
import KeyWords from '@/views/sltotal/components/keywords.vue'
export default {
  components: {
    Date,
    State,
    KeyWords
  },
  data () {
    return {
      list: [{
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        count: 2,
        haveRead: true,
        noRead: false,
        late: true
      },
      {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        count: 0,
        haveRead: true,
        noRead: false
      },
      {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: true,
        late: true

      }, {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: true
      }, {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: true,
        late: true

      }, {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: true
      },
      {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: false
      }, {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: false
      }, {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: false
      }, {
        name: '[日报]',
        date: '2021-09-09',
        depart: '总部企业信息化部',
        haveRead: false,
        noRead: false
      }
      ],
      loading: false,
      finished: false,
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
        keyWords: ''
      }
    }
  },
  methods: {
    // 下拉加载
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
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
    // search搜索
    search () {

    }

  }
}
</script>

<style lang="less" scoped>
.viewPort {
  // padding-top: 44px;
  background-color: #fafbfe;
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
    height: 264px;
    width: 100%;
    background-color: #ffffff;
    padding: 18px 16px 29px 17px;
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
        // width: 272px;
        height: 34px;
        &:nth-child(2) {
          margin-left: 11px;
          color: #0077ff !important;
        }
      }
    }
  }

  // 列表项
  .list {
    padding: 8px 12px 80px;
    .van-cell {
      padding: 0;
      height: 52px;
      margin-top: 12px;
      background: #ffffff;
      box-shadow: 0px 2px 8px -2px rgba(195, 197, 206, 0.2);
      padding-left: 10px;
      line-height: 52px;

      .name {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #2768ff;
        line-height: 20px;
        padding-right: 8px;
      }
      .date {
        display: inline-block;
        width: 190px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #0e1728;
        line-height: 22px;
        .late {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #ff274f;
          line-height: 20px;
        }
      }
      .info {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0077ff;
        span {
          margin-left: 5px;
        }
        img {
          vertical-align: middle;
          width: 18px;
          height: 16px;
        }
      }
      .read {
        // margin-left: 11px;
        float: right;
        margin: 14px 8px 0 0;
        width: 50px;
        height: 24px;
        background: #eef5ff;
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #0077ff;
        line-height: 24px;
        text-align: center;
      }
      .late-n {
        float: right;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #ff274f;
        margin-top: 2px;
      }
    }
    .lis {
      height: 96px;
      line-height: 51px;
      padding-right: 11px;
      // 未阅下方容器
      .noRead {
        border-top: 1px solid #f7f7f7;
        height: 44px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        line-height: 20px;
        padding: 10px 1px 12px 0px;
        // 未阅
        .read-n,
        .read-c {
          display: inline-block;
          width: 50px;
          height: 24px;
          background: #fff9f1;
          text-align: center;
          line-height: 24px;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 600;
          color: #fb7829;
        }
        // 云草稿
        .read-c {
          width: 62px;
          background: #f0faf4;
          color: #019c7f;
        }
        // 按钮
        .btn-group {
          float: right;
          width: 28 * 3px;
          .edit,
          .del {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #0077ff;
            line-height: 24px;
            &:active {
              opacity: 0.7;
            }
          }
          .del {
            margin-left: 28px;
            color: #ff274f;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
