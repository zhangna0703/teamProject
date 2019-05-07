import axios from 'axios'
import {
  // MessageBox,
  Message
} from 'element-ui'
// import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://169.254.121.1:7001', // api 的 base_url
  // baseURL: 'api'
  baseURL: /jasonandjay\.com/.test(window.location.host) ? 'https://exam.jasonandjay.com/' : '/api'
  // withCredentials: true // 跨域请求时发送 cookies
  // timeout: 5000 // request timeout
  // baseURL: '/api'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getToken()) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 1) {
      return res
    }
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // 请自行在引入 MessageBox
    //     // import { Message, MessageBox } from 'element-ui'
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload() // 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject(res.message || 'error')
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

