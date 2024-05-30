const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const permission = require('../utils/permission')
const config = require('../config')

// 注册新用户
exports.register =  (req, res) => {
  const userinfo = req.body
  console.log(userinfo)

  if(!userinfo.username || !userinfo.password) return res.cc('用户名或密码不合法')

  // 用户名重复查询操作
  const sql = 'select * from users where username=?'
  db.query(sql, [userinfo.username], (err, results) => {
    if(err) return res.cc(err)

    if(results.length > 0) return res.cc('用户名被占用') 

    // userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    const sql = 'insert into users set ?'
    db.query(sql, userinfo, (err, results) => {
      if(err) return res.cc(err)

      if(results.affectedRows !== 1) return res.cc( '注册失败')

      res.cc('注册成功', 200)
    })
  })
  // res.cc('123',200)
}

// 登录
exports.login =  (req, res) => {
  const userinfo = req.body
  console.log(userinfo);
  const sql = 'select * from users where username = ?'
  db.query(sql, userinfo.username, (err, results) => {
    if(err) return res.cc(err)

    if(results.length !== 1) return res.cc('用户名或密码不正确')
    console.log(userinfo.password)
console.log(results[0].password)
    // const compare = bcrypt.compareSync(userinfo.password, results[0].password)
    const compare = userinfo.password === results[0].password
    if(!compare) return res.cc('用户名或密码不正确')

    const user = { ...results[0], password: '', userpic: '' }

    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

    console.log(tokenStr);
    res.send({
      status: 200,
      message: '登录成功',
      token: tokenStr
    })

  })
}

// 退出
exports.logout =  (req, res) => {
  res.cc('退出成功', 200)
}


exports.menus = (req, res) => {
  console.log('获取菜单')
  const roles = req.body.roles
  console.log(roles)
  if(roles == 'admin') {
    res.send({
      status: 200,
      message: '获取成功',
      data: permission.adminRouter
    })
  } else if(roles === 'designer') {
    res.send({
      status: 200,
      message: '获取成功',
      data: permission.designerRouter
    })
  } else if(roles === 'user') {
    res.send({
      status: 200,
      message: '获取成功',
      data: permission.userRouter
    })
  } else if(roles === 'all') {
    res.send({
      status:200,
      message: '获取成功',
      data: permission.adminRouter.concat(permission.designerRouter, permission.userRouter)
    })
  } else {
    res.cc('error', 505)
  }

  // res.cc('获取菜单', 200)
}