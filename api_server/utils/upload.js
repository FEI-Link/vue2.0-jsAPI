const multer = require('multer')
// const path = require('path')
const hash = require('../utils/crypto')
const upload = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, 'img/')
      },
      filename: function (req, file, cb) {
          // fieldname是表单的name值，也就是我们设定的“logo”，
          // originalname是文件上传时的名字，可以根据它获取后缀，
          // encoding，mimetype 我就不详细介绍了，可以自行输出查看。
          const { fieldname, originalname, encoding, mimetype } = file

          // console.log('fieldname', fieldname)
          const name = hash.stringToHash(originalname)
          const after = originalname.split('.')[1] ? '.' + originalname.split('.')[1] : '.jpg'
          cb(null, name + after);
      }
  })
})

module.exports = upload


// var storage = multer.diskStorage({
//   // 配置文件上传后存储的路径
//   destination: function (req, file, cb) {
//       // NodeJS的两个全局变量
//       // console.log(__dirname);  //获取当前文件在服务器上的完整目录 
//       // console.log(__filename); //获取当前文件在服务器上的完整路径 
//       cb(null, path.join(__dirname,'img'))
//   },
//   // 配置文件上传后存储的路径和文件名
//   filename: function (req, file, cb) {
//       console.log('file',file);
//       cb(null, Date.now() + path.extname(file.originalname))
//   }
// })
// var upload = multer({ storage: storage })