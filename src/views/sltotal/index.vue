<template>
  <div class="viewPort">
    <van-nav-bar
      title="日报系统"
      left-arrow
      @click-left="$router.go(-1)"
      safe-area-inset-top
    />
    <!-- banner图 -->
    <div class="banner"></div>
    <div class="main">
      <!-- 卡片展示栏 -->
      <ul class="clearfix">
        <li class="card">
          <div class="img">
            <img class="h-img" src="@/assets/image/hasReceived.png" alt="" />
          </div>
          <div class="box">
            <span class="num num-w">455</span>
            <span class="text">已收日报</span>
          </div>
        </li>
        <li class="card">
          <div class="img">
            <img class="h-img" src="@/assets/image/readyReceived.png" alt="" />
          </div>
          <div class="box">
            <span class="num num-w">203</span>
            <span class="text">待收日报</span>
          </div>
        </li>
        <li class="card">
          <div class="img">
            <img class="w-img" src="@/assets/image/hasRead.png" alt="" />
          </div>
          <div class="box">
            <span class="num">210</span>
            <span class="text">已批阅日报</span>
          </div>
        </li>
        <li class="card">
          <div class="img">
            <img class="w-img" src="@/assets/image/readyRead.png" alt="" />
          </div>
          <div class="box">
            <span class="num">125</span>
            <span class="text">待批阅日报</span>
          </div>
        </li>
      </ul>
      <!-- 列表栏 -->
      <ul class="show">
        <li>
          <div class="num">223</div>
          <div class="text">收藏的日报</div>
        </li>
        <li>
          <div class="num">223</div>
          <div class="text">抄送我的日报</div>
        </li>
        <li>
          <div class="num">223</div>
          <div class="text">未按时提交日报</div>
        </li>
        <li>
          <div class="num late">223</div>
          <div class="text">未提交日报</div>
        </li>
        <li>
          <div class="num">223</div>
          <div class="text">我关注的同事</div>
        </li>
        <li>
          <div class="num">223</div>
          <div class="text">申请晚发人数</div>
        </li>
      </ul>
    </div>
    <div class="section">
      <div class="title">
        <h1>今日待批阅日报</h1>
        <span class="date">{{ getTime() }}</span>
        <span class="more" @click="$router.push('/more')">更多</span>
      </div>
      <div class="list">
        <!-- 列表项 -->
        <van-cell-group :border="false">
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
        </van-cell-group>
      </div>
    </div>

    <div class="btn">
      <van-button
        type="danger"
        color="#FF8D24"
        @click="$router.push('/myRecord')"
      >
        <img src="@/assets/image/edit.png" alt="" />
        我的日报</van-button
      >
      <van-button type="danger" color="#0077FF"
        ><img src="@/assets/image/write.png" alt="" />写日报</van-button
      >
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data () {
    return {
      infoList: [
        { id: 1, depart: '企业信息化部', focus: true, name: '吴亦凡', date: '2021-09-08' },
        { id: 2, depart: '企业信息化部', focus: true, name: '吴亦fan', date: '2021-09-08' },
        { id: 3, depart: '产品解决方案中心', focus: true, name: '吴e反', date: '2021-09-08' },
        { id: 4, depart: '市场部', focus: false, name: '吴亦反', date: '2021-09-08' },
        { id: 5, depart: '人力资源部', focus: false, name: '吴亦fn', date: '2021-09-08' }
      ]
    }
  },
  methods: {
    // 日期
    getTime () {
      const date = dayjs().format('YYYY年MM月DD日')
      return date
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
  .banner {
    width: 100%;
    height: 108px;
    background: url("~@/assets/image/banner.png");
    background-size: contain;
  }
  // 卡片展示主体内容
  .main {
    padding: 16px;
    // 卡片列表
    ul {
      .card {
        width: 167px;
        height: 72px;
        background: #ecf5fc;
        float: left;
        margin-top: 8px;
        margin-right: 9px;
        padding: 14px 0px 0px 22px;
        transition: all 0.2s;
        &:active {
          transition: 0;
          opacity: 0.8;
          transform: scale(0.9);
        }
        .h-img {
          width: 37px;
          height: 41px;
        }
        .w-img {
          width: 78 / 2px;
          height: 68 / 2px;
        }
        &:nth-child(2n) {
          margin-right: 0;
        }
        &:nth-child(-n + 2) {
          margin-top: 0;
        }
        &:nth-child(2) {
          background: #fbeef5;
        }
        &:nth-child(3) {
          background: #fff7eb;
        }
        &:nth-child(4) {
          background: #edfffc;
        }
        .img {
          float: left;
        }
        .box {
          float: left;
          margin-left: 22px;
          display: flex;
          flex-direction: column;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #374b7c;
          align-items: flex-start;
          .num {
            font-size: 20px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 700;
            color: #1e1d4d;
            line-height: 28px;
            margin-top: -4px;
          }
          .num-w {
            margin-top: 0px;
          }
          .text {
            line-height: 17px;
            margin-top: -2px;
          }
        }
      }
    }
    // 收藏日报-申请晚发人数 展示列表
    .show {
      width: 343px;
      height: 140px;
      background: #fafbfe;
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 33%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 15px;
        transition: all 0.2s;
        &:active {
          transition: 0;
          opacity: 0.7;
          transform: scale(0.9);
        }
        .num {
          font-size: 20px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 700;
          color: #2768ff;
        }
        .late {
          color: #ff274f;
        }
        .text {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #374b7c;
        }
        &:after {
          position: absolute;
          right: 0;
          top: 22px;
          display: block;
          content: "";
          width: 1px;
          height: 28px;
          background-color: #e5edf3;
        }
        &:nth-child(3n) {
          &::after {
            width: 0;
          }
        }
      }
    }
  }
  // 列表
  .section {
    width: 100%;
    padding: 0 16px;
    h1 {
      display: inline-block;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 700;
      color: #000000;
      line-height: 25px;
      margin-bottom: 10px;
    }
    .date {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 17px;
      margin-left: 15px;
    }
    .more {
      // width: 28px;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0077ff;
      float: right;
      margin-top: 8px;
      transition: all 0.2s;
      &:active {
        font-weight: 600;
        transform: scale(1.1);
        transition: all 0s;
      }
    }
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
  // 按钮
  .btn {
    margin-top: 33px;
    display: flex;
    justify-content: space-between;
    ::v-deep .van-button {
      flex: 1;
      border-radius: 0 !important;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      line-height: 22px;
      height: 50px;
    }
    img {
      width: 16px;
      height: 16px;
      margin-right: 9px;
      transform: translateY(2px);
    }
  }
}
</style>
