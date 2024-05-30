const express = require('express')
const router = express.Router()

const admin_user = require('../../router_handle/admin/user')

router.get('/list', admin_user.userlist)
router.post('/search', admin_user.usersearch)
router.post('/edit', admin_user.useredit)
router.post('/delete', admin_user.userdelete)
router.post('/add', admin_user.useradd)
router.post('/validatename', admin_user.uservalidatename)

// router.get('/teacherlist', admin_user.userteacherlist)

module.exports = router