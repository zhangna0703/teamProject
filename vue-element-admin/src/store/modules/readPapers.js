import {
  classInfo,
  getStudent,
  getExam,
  getScroll
} from '@/api/readPapers'

const state = {
  classArr: [],
  studentData: [],
  message: {}
}
const mutations = {
  CHANGE_CLASS(state, payload) {
    state.classArr = payload.data
  },
  CHANGE_DATA(state, payload) {
    if (!payload) {
      state.studentData = []
    } else {
      if (payload.code === 1) {
        state.studentData = payload.exam
      }
    }
  },
  CHNAGE_MES(state, payload) {
    if (!payload) {
      state.message = {}
    } else {
      if (payload.code === 1) {
        state.message = payload.data
      }
    }
  }
}
const actions = {
  // 获取已经分配教室的班级,得到待批班级的信息
  async getExamType({ commit }) {
    const getClassInfo = await classInfo()
    commit('CHANGE_CLASS', getClassInfo)
  },
  // 获取学生试卷列表
  async getStudentList({ commit }, payload) {
    const studentData = await getStudent(payload)
    commit('CHANGE_DATA', studentData)
  },
  // 获取学生试卷信息
  async getExamMsg({ commit }, payload) {
    const message = await getExam(payload)
    commit('CHNAGE_MES', message)
  },
  // 提交分数
  async subScroll({ commit }, payload) {
    var res = await getScroll(payload)
    return res
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
