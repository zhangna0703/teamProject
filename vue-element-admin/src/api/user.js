import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/userInfo',
    method: 'get'
  })
}

export function getViewAuthority(data) {
  return request.get('/user/new', { params: { user_id: data }})
}
export function newitem(data) {
  return request.get('/user/new', { params: { user_id: data.user_id }})
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
