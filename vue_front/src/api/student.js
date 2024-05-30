import request from '@/utils/request'

export function getCourseList(params) {
  return request({
    url: 'api/student/courselist',
    method: 'get'
  })
}

export function getPaperList(params) {
  return request({
    url: 'api/student/paperlist',
    method: 'get'
  })
}

export function getQuestionList(id) {
  return request({
    url: 'api/student/questionlist',
    method: 'post',
    data: {
      paperid: id
    }
  })
}
export function submitScore(data) {
  return request({
    url: 'api/student/submitscore',
    method: 'post',
    data
  })
}