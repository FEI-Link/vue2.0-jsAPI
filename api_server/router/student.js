const express = require('express')
const router = express.Router()

const student_handler = require('../router_handle/student')

router.get('/courselist', student_handler.courselist)
router.get('/paperlist', student_handler.paperlist)
router.post('/questionlist', student_handler.questionlist)
router.post('/submitscore', student_handler.submitscore)

module.exports = router