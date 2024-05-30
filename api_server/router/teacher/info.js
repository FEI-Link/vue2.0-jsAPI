const express = require('express')
const router = express.Router()

const teacher_course = require('../../router_handle/teacher/info')

router.post('/teacherinfo', teacher_course.teacherInfo)
router.post('/studentlist', teacher_course.studentlist)
router.get('/userstudentlist', teacher_course.userstudentlist)

module.exports = router