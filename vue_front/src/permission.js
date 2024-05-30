import router from './router/index'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { filterAsyncRouter } from '@/store/modules/permission'
import { buildMenus } from '@/api/menu'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.roles
      if (!hasGetUserInfo) {
        try {
          // get user info
          store.dispatch('user/getInfo').then(res => {
            loadMenus(next, to)
          })
          
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else if(!store.getters.loadMenus) {
        loadMenus(next, to)
      } else {
        // next({ ...to, replace: true })
        next()

      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  const roles = store.getters.roles
  buildMenus(roles).then(res => {
    res = res.data
    const sdata = JSON.parse(JSON.stringify(res))
    const rdata = JSON.parse(JSON.stringify(res))

    const sidebarRoutes = filterAsyncRouter(sdata)
    const rewriteRoutes = filterAsyncRouter(rdata, true)

    rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })

    // 存储路由

    store.dispatch('permission/GenerateRoutes', rewriteRoutes).then(() => {
      // 动态添加可访问路由表
      router.addRoutes(store.getters.routers)

      next({ ...to, replace: true })
    })

    store.dispatch('permission/SetSidebarRouters', sidebarRoutes)

    // 修改成false，防止死循环
    store.dispatch('user/updateLoadMenus')
  }).catch(err => {
    console.log(err)
  })
}


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
