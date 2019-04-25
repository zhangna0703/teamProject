import {
  adduser,
  addIdent,
  addApi,
  allView,
  addView,
  allIndentity,
  apiAuth,
  setApi,
  setView,
  showApi,
  showView,
  showPeo,
  change
} from '@/api/addUser'
import { showUser } from '@/api/showUser'
const state = {
  viewOpt: [],
  allIden: [],
  apiOpt: [],
  dateList: [],
  users: []
}

const mutations = {
  CHANGE_VIEWOPT: (state, payload) => {
    state.viewOpt = payload.data
    state.dateList = payload.data
  },
  CHANGE_ALLIDEN: (state, payload) => {
    state.allIden = payload.data
    state.dateList = payload.data
  },
  CHANGE_APIOPT: (state, payload) => {
    state.apiOpt = payload.data
    state.dateList = payload.data
  },
  CHANGE_DATELIST: (state, token) => {
    state.dateList = token.data
  },
  CHANGE_DATALIST: (state, token) => {
    state.dateList = token.data
  },
  CHANGE_SHOW: (state, payload) => {
    state.users = payload.data
  }
}

const actions = {
  // 添加用户
  async addPeo({ commit }, payload) {
    const res = await adduser(payload)
    return res
  },
  // 用户信息
  async dateList({ commit }, payload) {
    var res = await showUser()
    commit('CHANGE_DATELIST', res)
  },
  // 添加身份信息
  async addIdentity({ commit }, payload) {
    var res = await addIdent(payload)
    return res
  },
  // 添加api接口权限信息
  async addApiAuth({ commit }, payload) {
    var res = await addApi(payload)
    return res
  },
  // 获取已有视图数据
  async allViewList({ commit }, payload) {
    var res = await allView()
    commit('CHANGE_VIEWOPT', res)
  },
  // 添加视图权限
  async addViewAuth({ commit }, payload) {
    var res = await addView(payload)
    return res
  },
  // 获取身份id
  async getAllIndetity({ commit }, payload) {
    var res = await allIndentity()
    commit('CHANGE_ALLIDEN', res)
  },
  // 获取api接口信息
  async getApiAuth({ commit }, payload) {
    var res = await apiAuth()
    commit('CHANGE_APIOPT', res)
  },
  // 设置身份api接口权限
  async setApiAuth({ commit }, payload) {
    var data = await setApi(payload)
    return data
  },
  // 设置身份的视图接口
  async setViewAuth({ commit }, payload) {
    var data = await setView(payload)
    return data
  },
  // 展示身份与api接口权限
  async showApiAuth({ commit }, payload) {
    var data = await showApi()
    // console.log(data)
    commit('CHANGE_DATALIST', data)
  },
  // 展示身份与视图接口
  async showViewAuth({ commit }, payload) {
    var data = await showView()
    commit('CHANGE_DATALIST', data)
  },
  // 获取所有的用户信息
  async showUsers({ commit }, payload) {
    var res = await showPeo()
    commit('CHANGE_SHOW', res)
  },
  // 更新用户
  async changeMes({ commit }, payload) {
    var res = await change(payload)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
