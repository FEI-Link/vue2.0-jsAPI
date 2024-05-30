const express = require('express')
const router = express.Router()

const designer_handler = require('../router_handle/designer')

router.get('/paperlist', designer_handler.paperlist)
router.post('/deletepaper', designer_handler.delpaper)
router.post('/create', designer_handler.createpaper)
router.post('/addplan', designer_handler.addplan)
router.post('/getplanbypaperid', designer_handler.getplanbypaperid)
router.post('/upplan', designer_handler.upplan)
router.post('/downplan', designer_handler.downplan)
router.post('/delplan', designer_handler.delplan)
// router.get('/courselist', student_handler.courselist)
// router.get('/paperlist', student_handler.paperlist)
// router.post('/questionlist', student_handler.questionlist)
// router.post('/submitscore', student_handler.submitscore)

module.exports = router