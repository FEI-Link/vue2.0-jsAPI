import request from '@/utils/request'

const prefix = 'api/teacher/course/'

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
      couseid: id
    }
  })
}

export function create(data) {
  return request({
    url: prefix + 'create',
    method: 'post',
    data
  })
}

export function addStudent(data) {
  return request({
    url: prefix + 'add/student',
    method: 'post',
    data
  })
}

export function addQuestion(data) {
  return request({
    url: prefix + 'add/question',
    method: 'post',
    data
  })
}

export function addPaper(data) {
  return request({
    url: prefix + 'add/paper',
    method: 'post',
    data
  })
}

export function getPaperList(data) {
  return request({
    url: prefix + 'getPaperList',
    method: 'post',
    data
  })
}