import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'api/designer/paperlist',
    method: 'get'
  })
}

export function dele(id) {
  return request({
    url: 'api/designer/deletepaper',
    method: 'post',
    data: {
      id
    }
  })
}

export function create(data) {
  return request({
    url: 'api/designer/create',
    method: 'post',
    data
  })
}

export function getplanbypaperid(id) {
  return request({
    url: 'api/designer/getplanbypaperid',
    method: 'post',
    data: {
      id
    }
  })
}

export function addplan(data) {
  return request({
    url: 'api/designer/addplan',
    method: 'post',
    data
  })
}

export function up(id) {
  return request({
    url: 'api/designer/upplan',
    method: 'post',
    data:{
      id
    }
  })
}
export function down(id) {
  return request({
    url: 'api/designer/downplan',
    method: 'post',
    data:{
      id
    }
  })
}

export function delplan(id) {
  return request({
    url: 'api/designer/delplan',
    method: 'post',
    data:{
      id
    }
  })
}