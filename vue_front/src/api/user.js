import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'api/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: 'api/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: 'user/userinfo1',
    method: 'get'
  })
}

export function getInfobyid(id) {
  return request({
    url: 'user/userinfobyid',
    method: 'post',
    data: {
      id
    }
  })
}

export function logout() {
  return request({
    url: 'api/logout',
    method: 'post'
  })
}
