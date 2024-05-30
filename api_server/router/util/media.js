const express = require('express')
const router = express.Router()
const upload = require('../../utils/upload')

const media = require('../../router_handle/util/media')

// 图片上传
router.post('/course/img', upload.single('file'), media.imgUpload)

module.exports = router