import axios from 'axios'
import { Toast } from 'vant'
// 调用 axios.create() 方法，创建 axios 的实例对象
const instance = axios.create({
  // 请求根路径
  baseURL: ''
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 展示 loading 效果
    Toast.loading({
      message: '加载中...', // 文本内容
      forbidClick: true,
      duration: 0 // 值为 0 时，toast 不会消失
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 隐藏 loading 效果
    Toast.clear()
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default instance
