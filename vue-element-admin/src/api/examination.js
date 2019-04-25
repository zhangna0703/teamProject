import request from '@/utils/request'

// 考试类型
export function typeExam() {
  return request({
    url: '/exam/examType',
    method: 'get'
  })
}
// 课程
export function getCurriculum() {
  return request({
    url: '/exam/subject',
    method: 'get'
  })
}
// 创建试卷
export function CreateExam(params) {
  return request({
    url: '/exam/exam',
    method: 'post',
    data: params
  })
}
// 获取试卷列表
export function getExamList() {
  return request({
    url: '/exam/exam',
    method: 'get'
  })
}
// 获取试卷列表详情
export function getExamDetail(data) {
  return request({
    url: '/exam/exam/' + data,
    method: 'get'
  })
}
// 获取所有的试题
export function getTest() {
  return request({
    url: '/exam/questions/new',
    method: 'get'
  })
}
// 更新试卷
export function renewal(str, data) {
  return request({
    url: '/exam/exam/' + str,
    method: 'put',
    data
  })
}
