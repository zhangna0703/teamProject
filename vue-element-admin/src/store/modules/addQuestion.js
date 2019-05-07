import { getUserInfo, getType, getSubject, getQuestionsType, getAddType, delAddType, addQuestion, updataQuestion, allExam, searchExam } from '@/api/addQuestion'
const state = {
  userInfo: [],
  allQuestion: [],
  examType: [],
  subjectType: [],
  questionsType: [],
  detail: {}
}
const mutations = {
  updataState(state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }
  }
}
const actions = {
  // 获取当前用户信息
  async getUser({ commit }, payload) {
    var result = await getUserInfo()
    commit('updataState', { userInfo: result.data })
  },
  // 获取所有的考试类型
  async getExamType({ commit }, payload) {
    var result = await getType()
    commit('updataState', { examType: result.data })
  },
  // 获取所有的课程
  async getSubjectType({ commit }, paylod) {
    var result = await getSubject()
    commit('updataState', { subjectType: result.data })
  },
  // 获取所有的试题类型 addQuestion,
  async getQuestionsTpe({ commit }, paylod) {
    var result = await getQuestionsType()
    commit('updataState', { questionsType: result.data })
  },
  // 添加试题类型
  async addType({ commit }, paylod) {
    var result = await getAddType(paylod)
    if (!result) {
      return { msg: '试题名称或者排序有重复数据' }
    }
    // if (result.code === 0) {
    //   return { msg: result.msg }
    // }
    return result
  },
  // 删除指定试题类型 delAddType
  async delType({ commit }, paylod) {
    var result = await delAddType(paylod)
    return result
  },
  // 添加试题
  async addQuestions({ commit }, paylod) {
    var result = await addQuestion(paylod)
    return result
  },
  // 更新试题
  async upQuestions({ commit }, paylod) {
    var result = await updataQuestion(paylod)
    if (!result) {
      return { msg: '更新失败' }
    }
    return result
  },
  // 获取所有的试题
  async getAllExam({ commit }, payload) {
    var result = await allExam()
    commit('updataState', { allQuestion: result.data })
  },
  // 按条件获取试题
  async getRightExam({ commit }, payload) {
    var result = await searchExam(payload)
    commit('updataState', { allQuestion: result.data })
  },
  // 获取详情信息
  async getDetail({ commit }, payload) {
    commit('updataState', { detail: payload })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
