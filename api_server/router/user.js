const express = require('express')
const router = express.Router()

const user_handler = require('../router_handle/user')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
const { req_login_schema } = require('../schema/user')


router.post('/register', user_handler.register)


router.post('/login', expressJoi(req_login_schema), user_handler.login)
router.post('/logout', user_handler.logout)
router.post('/menus',user_handler.menus)




module.exports = router