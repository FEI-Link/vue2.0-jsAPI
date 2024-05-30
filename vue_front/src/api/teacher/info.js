import request from '@/utils/request'

const prefix = 'api/teacher/info/'

export function teacherinfo(id) {
  return request({
    url: prefix + 'teacherinfo',
    method: 'post',
    data: {
      userId: id
    }
  })
}

export function studentlist(id) {
  return request({
    url: prefix + 'studentlist',
    method: 'post',
    data: {
      courseid: id
    }
  })
}

export function userstudentlist() {
  return request({
    url: prefix + 'userstudentlist',
    method: 'get'
  })
}