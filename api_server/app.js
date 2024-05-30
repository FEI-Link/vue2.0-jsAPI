const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
const expressJWT = require('express-jwt')
const config = require('./config.js')
const userRouter = require('./router/user')
const dataRouter = require('./router/data')
const userinfoRouter = require('./router/userinfo')
const studentRouter = require('./router/student')

const teacherCourseRouter = require('./router/teacher/course')
const infoCourseRouter = require('./router/teacher/info')

const adminUserRouter = require('./router/admin/user')
const adminCourseRouter = require('./router/admin/course')


const designerRouter = require('./router/designer')



const mediaRouter = require('./router/util/media')

const bodyParser = require('body-parser');

const app = express()

// 跨域处理
app.use(cors())


// 表单解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// send() 优化：对错误的处理中间件
app.use((req, res, next) => {
  res.cc = function(err, status = 500) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }

  next()
})


// token认证
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//,]}))

app.use('/public', express.static('public/dist'))
app.use('/img', express.static('img'))

// 引入路由
app.use('/api', userRouter)
app.use('/api', dataRouter)
app.use('/user', userinfoRouter)

app.use('/api/student', studentRouter)


app.use('/api/admin/user', adminUserRouter)

app.use('/api/designer', designerRouter)




app.use('/api/admin/course', adminCourseRouter)

app.use('/api/teacher/course', teacherCourseRouter)
app.use('/api/teacher/info', infoCourseRouter)

app.use('/api/', mediaRouter)   // 媒体路由

// 错误级中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if(err instanceof joi.ValidationError) return res.cc(err)
  // JWT身份认证失败
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  console.log('未知错误', err);
  // 未知错误
  res.cc(err)

})

app.listen(3000, () => {
  console.log('服务器已启动');
})