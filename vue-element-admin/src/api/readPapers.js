import request from '@/utils/request'

// 获取已经分配教室的班级,得到待批班级的信息
export function classInfo() {
  return request({
    url: '/manger/grade',
    method: 'get'
  })
}
// 获取学生试卷列表
export function getStudent(params) {
  return request({
    url: '/exam/student',
    method: 'get',
    params
  })
}
// 获取学生试卷
export function getExam(data) {
  return request({
    url: '/exam/student/' + data.id,
    method: 'get'
  })
}
// 批阅试卷
export function getScroll(data) {
  return request({
    url: '/exam/student/' + data.id,
    method: 'put',
    data: data
  })
}
