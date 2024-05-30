// 课程封面上传
exports.imgUpload = (req, res) => {
  console.log(req.file)
  res.send({
    status: 200,
    message: '文件上传成功',
    data: req.file.path
  })
}