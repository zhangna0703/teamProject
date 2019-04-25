import request from '@/utils/request'

// 添加用户
export function adduser(params) {
  return request({
    url: '/user',
    method: 'post',
    data: params
  })
}
// 添加身份信息
export function addIdent(params) {
  return request({
    url: '/user/identity/edit',
    method: 'get',
    params
  })
}

// 添加api接口权限信息
export function addApi(params) {
  return request({
    url: '/user/authorityApi/edit',
    method: 'get',
    params
  })
}

// 获取已有视图权限接口
export function allView() {
  return request({
    url: '/user/view_authority',
    method: 'get'
  })
}

// 添加视图权限
export function addView(params) {
  return request({
    url: '/user/authorityView/edit',
    method: 'get',
    params
  })
}

// 获取身份id
export function allIndentity() {
  return request({
    url: '/user/identity',
    method: 'get'
  })
}

// 获取api接口权限
export function apiAuth() {
  return request({
    url: '/user/api_authority',
    method: 'get'
  })
}
// 给身份设置api接口权限
export function setApi(params) {
  return request({
    url: '/user/setIdentityApi',
    method: 'post',
    data: params
  })
}

// 给身份设置视图权限
export function setView(params) {
  return request({
    url: '/user/setIdentityView',
    method: 'post',
    data: params
  })
}
// 展示身份与api接口信息
export function showApi() {
  return request({
    url: '/user/identity_api_authority_relation',
    method: 'get'
  })
}
// 展示身份与视图接口权限
export function showView() {
  return request({
    url: '/user/identity_view_authority_relation',
    method: 'get'
  })
}
// 展示所有用户的身份信息
export function showPeo() {
  return request({
    url: '/user/user',
    method: 'get'
  })
}
// 更新用户
export function change(params) {
  return request({
    url: '/user/user',
    method: 'put',
    data: params
  })
}
