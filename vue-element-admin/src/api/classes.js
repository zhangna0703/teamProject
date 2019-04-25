import request from '@/utils/request'

// 获取所有班级
export function getAllClass() {
  return request({
    url: '/manger/grade',
    method: 'get'
  })
}
// 获取所有教室
export function getAllRoom() {
  return request({
    url: '/manger/room',
    method: 'get'
  })
}

// 获取所有学生
export function getAllStudent() {
  return request({
    url: '/manger/student',
    method: 'get'
  })
}

// 添加教室
export function addRoom(params) {
  return request({
    url: '/manger/room',
    method: 'post',
    data: params
  })
}

// 删除教室
export function deleteRoom(params) {
  return request({
    url: '/manger/room/delete',
    method: 'delete',
    data: params
  })
}

// 添加班级
export function addGrade(params) {
  return request({
    url: '/manger/grade',
    method: 'post',
    data: params
  })
}

// 删除班级
export function deleteGrade(params) {
  return request({
    url: '/manger/grade/delete',
    method: 'delete',
    data: params
  })
}

// 更新班级
export function updateGrade(params) {
  return request({
    url: '/manger/grade/update',
    method: 'put',
    data: params
  })
}

// 删除学生
export function deleteStudent(params) {
  return request({
    url: '/manger/student/' + params,
    method: 'delete'
  })
}
