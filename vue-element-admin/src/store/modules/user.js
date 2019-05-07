import { login, logout, getInfo, getViewAuthority, newitem } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: {}, // 用户信息
  viewAuthority: [] // 用户路由权限
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_VIEWAUTHORITY: (state, viewAuthority) => {
    state.viewAuthority = viewAuthority
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    var res = await login({ user_name: username, user_pwd: password })
    setToken(res.token)
    return res
  },
  // 获取当前用户的视图权限
  async newitems({ commit }, payload) {
    const res = await newitem(payload)
    console.log('获取当前用户的视图权限', res)
  },

  // get user info
  async getInfo({ commit }) {
    const data = await getInfo()
    commit('SET_USERINFO', data.data)
    return data.data
  },
  // get user view_authority
  async getViewAuthority({ commit }, payload) {
    const userAuthority = await getViewAuthority(payload)
    if (userAuthority.code === 1) {
      commit('SET_VIEWAUTHORITY', userAuthority.data)
      return userAuthority.data
    }
    return []
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_USERINFO', '')
        commit('SET_VIEWAUTHORITY', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'
      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
