import request from '@/utils/request'

const prefix = 'api/admin/user/'

export function list() {
  return request({
    url: prefix + 'list',
    method: 'get',
  })
}

export function search(data) {
  return request({
    url: prefix + 'search',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: prefix + 'edit',
    method: 'post',
    data
  })
}

export function delta(id) {
  return request({
    url: prefix + 'delete',
    method: 'post',
    data: {
      userId: id
    }
  })
}

export function add(data) {
  return request({
    url: prefix + 'add',
    method: 'post',
    data
  })
}

export function unique(username) {
  return request({
    url: prefix + 'validatename',
    method: 'post',
    data: {
      username
    }
  })
}