import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(view_ids, route) {
  if (route.meta && route.meta.view_id) {
    return view_ids.some(item => item === route.meta.view_id)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, view_ids) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(view_ids, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, view_ids)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, view_authority) {
    // 获取用户所拥有的view_ids
    const view_ids = view_authority.map(item => item.view_id)
    // 在动态路由里过滤一遍，得到用户能访问的路由
    const accessedRoutes = filterAsyncRoutes(asyncRoutes, view_ids)
    console.log('可访问的路由', accessedRoutes)
    // 更新路由
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
