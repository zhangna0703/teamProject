// 引入路由实例
import router from './router'
// 引入vuex的实例
import store from './store'
// 引入ele提示组件
import { Message } from 'element-ui'
// 页面加载进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import { getToken } from '@/utils/auth' // get token from cookie

// 配置进度条是否需要Spinner
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const userInfo = store.getters.userInfo
      // 判断是否获取过用户信息，如果有就不再获取，如果没有就第一次获取
      if (userInfo.user_name) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 1.如果没有用户信息就去获取用户信息
          const userInfo = await store.dispatch('user/getInfo')
          console.log('userInfo...', userInfo)

          // 2.通过身份获取权限
          const viewAuthority = await store.dispatch('user/getViewAuthority')

          // 3.通过权限生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', viewAuthority)

          // 4.动态添加路由到路由表
          router.addRoutes(accessRoutes)

          // // hack method to ensure that addRoutes is complete
          // // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          console.log('error....', error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    // 判断要去的页面是否在白名单内，在的话就不重定向到登陆页面，不在就重定向到登陆页面
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
