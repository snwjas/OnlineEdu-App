import request from '@/utils/request'

const api_prefix = '/api/app/member'

// 登录
export function login(data) {
  return request({
    url: `${api_prefix}/login`,
    method: 'post',
    data
  })
}

// 注册
export function register(data) {
  return request({
    url: `${api_prefix}/register`,
    method: 'post',
    data
  })
}

// 注销登录
export function logout() {
  return request({
    url: `${api_prefix}/logout`,
    method: 'post'
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: `${api_prefix}/info`,
    method: 'get'
  })
}

// 修改信息
export function updateProfile(data) {
  return request({
    url: `${api_prefix}/update/profile`,
    method: 'post',
    data
  })
}

// 修改密码
export function updatePassword(data) {
  return request({
    url: `${api_prefix}/update/password`,
    method: 'post',
    data
  })
}

// 修改头像
export function updateAvatar(data) {
  return request({
    url: `${api_prefix}/update/avatar`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

// 删除用户
export function deleteUser(userId) {
  return request({
    url: `${api_prefix}/delete/${userId}`,
    method: 'post'
  })
}
