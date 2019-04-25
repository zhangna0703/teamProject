import request from '@/utils/request'

export function showUser() {
  return request({
    url: '/user/user',
    method: 'get'
  })
}
export function identity() {
  return request({
    url: '/user/identity',
    method: 'get'
  })
}
