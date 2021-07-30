import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const Home = () => import('@/views/sltotal/index.vue')
const More = () => import('@/views/sltotal/more/index.vue')
const Record = () => import('@/views/sltotal/record/index.vue')
const MyRecord = () => import('@/views/sltotal/record/myRecord.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/record',
    component: Record
  },
  {
    path: '/myRecord',
    component: MyRecord
  },
  {
    path: '/more',
    component: More
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition && to.meta.keepAlive) {
      return savedPosition
    }
    // 异步滚动操作
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ x: 0, y: 1 })
      }, 0)
    })
  }
})

// let isLogin = false
router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (to.meta.requiresAuth && !isLogin) {
  //   alert('未登录')
  //   next({ name: 'User' })
  //   isLogin = true
  // } else {
  //   console.log('已登录')
  next()
  // }
})
router.afterEach(transition => {
  NProgress.done()
})

export default router
