import { allExam } from '@/api/addQuestion'
const state = {
  allExam: [],
  subjectType: [],
  questionsType: []
}
const mutations = {
  updataState(state, payload) {
    for (var key in payload) {
      state[key] = payload[key]
    }
  }
}
const actions = {
  async getAllExam({ commit }, payload) {
    var result = await allExam()
    // commit('updataState', { examType: result.data })
    console.log(result)
  }
  // 获取所有的课程
//   async getSubjectType({ commit }, paylod) {
//     var result = await getSubject()
//     commit('updataState', { subjectType: result.data })
//     console.log(result)
//   },
  // 获取所有的试题类型
//   async getQuestionsTpe({ commit }, paylod) {
//     var result = await getQuestionsType()
//     commit('updataState', { questionsType: result.data })
//     console.log(result, 'snf')
//   }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
