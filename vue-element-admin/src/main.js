import Vue from 'vue'
// 方便以对象方式操作cookie
import Cookies from 'js-cookie'
// 消除浏览器差异
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// 引入elemnt-ui
import Element from 'element-ui'
import './styles/element-variables.scss'

// 引入全局样式
import '@/styles/index.scss' // global css

// 引入根路由
import App from './App'
// 引入数据管理vuex
import store from './store'
// 引入路由
import router from './router'
// 引入国际化配置
import i18n from './lang' // Internationalization

import './icons' // icon
// 引入导航守卫
import './permission' // permission control
// 错误处理
import './utils/errorLog' // error log

// 挂载只定义过滤器
import * as filters from './filters' // global filters
// 挂载mock,拦截请求
// import { mockXHR } from '../mock' // simulation data

// mock api in github pages site build
// if (process.env.NODE_ENV === 'production') { mockXHR() }

// if (process.env.NODE_ENV === 'production') { mockXHR() }

// 挂载Element
// import { mockXHR } from '../mock' // simulation data

// mock api in github pages site build
// if (process.env.NODE_ENV === 'production') { mockXHR() }

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局过滤器
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 使用生成环境提示
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  // template: '<App/>'
  render: h => h(App)
})
