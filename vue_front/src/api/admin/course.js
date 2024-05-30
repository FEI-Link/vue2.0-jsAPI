import request from '@/utils/request'

const prefix = 'api/admin/course/'

export function list() {
  return request({
    url: prefix + 'list',
    method: 'get',
  })
}

export function teacherList() {
  return request({
    url: 'api/admin/user/teacherlist',
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
      couseid: id
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

export function unique(coursename) {
  return request({
    url: prefix + 'validatename',
    method: 'post',
    data: {
      coursename
    }
  })
}