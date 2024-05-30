const express = require('express')
const router = express.Router()

const admin_course = require('../../router_handle/admin/course')

router.get('/list', admin_course.courselist)
router.post('/search', admin_course.coursesearch)
router.post('/edit', admin_course.courseedit)
router.post('/delete', admin_course.coursedelete)
router.post('/add', admin_course.courseadd)

module.exports = router