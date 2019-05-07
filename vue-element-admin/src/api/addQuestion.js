import request from '@/utils/request'
// 获取当前用户信息
export function getUserInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}
// 获取考试类型
export function getType() {
  return request({
    url: '/exam/examType',
    method: 'get'
  })
}
// 获取所有的课程
export function getSubject() {
  return request({
    url: '/exam/subject',
    method: 'get'
  })
}
// 获取所有的试题类型
export function getQuestionsType() {
  return request({
    url: '/exam/getQuestionsType',
    method: 'get'
  })
}
// 添加试题类型
export function getAddType(params) {
  return request({
    url: '/exam/insertQuestionsType',
    method: 'get',
    params
  })
}
// 删除指定试题类型
export function delAddType(params) {
  return request({
    url: '/exam/delQuestionsType',
    method: 'post',
    data: params
  })
}
// 添加试题
export function addQuestion(data) {
  return request({
    url: '/exam/questions',
    method: 'post',
    data
  })
}
// 更新试题
export function updataQuestion(data) {
  return request({
    url: '/exam/questions/update',
    method: 'put',
    data
  })
}
// 获取所有的试题
export function allExam(params) {
  return request({
    url: '/exam/questions/new',
    method: 'get',
    params
  })
}

// 获取所有的试题
export function searchExam(params) {
  return request({
    url: '/exam/questions/condition',
    method: 'get',
    params
  })
}
