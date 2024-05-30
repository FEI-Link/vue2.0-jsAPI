import request from '@/utils/request'

export function buildMenus(roles) {
  return request({
    url: 'api/menus',
    method: 'post',
    data: {
      roles
    }
  })
}