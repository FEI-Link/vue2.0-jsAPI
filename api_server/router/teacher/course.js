const express = require('express')
const router = express.Router()

const teacher_course = require('../../router_handle/teacher/course')

router.get('/list', teacher_course.list)
router.post('/search', teacher_course.search)
router.post('/edit', teacher_course.edit)
router.post('/delete', teacher_course.delete)
router.post('/create', teacher_course.create)
router.post('/add/student', teacher_course.addStudent)
router.post('/add/question', teacher_course.addQuestion)
router.post('/add/paper', teacher_course.addPaper)
router.post('/getPaperList', teacher_course.getPaperList)

module.exports = router