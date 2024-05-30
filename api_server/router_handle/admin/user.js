const db = require("../../db")

// 获取用户的基本信息
exports.userlist = (req, res) => {
  const sql = 'SELECT * FROM learn.users;'

  db.query(sql,  (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取用户信息失败')

    res.send({
      status: 200,
      message: '获取用户基本信息成功',
      data: results
    })
  })
}




// 查询用户
exports.usersearch = (req, res) => {
  const sql = 'SELECT * FROM learn.users where username = ?;'

  db.query(sql, req.body.username,  (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('无')

    res.send({
      status: 200,
      message: '获取成功',
      data: results
    })
  })
}

// 用户信息编辑
exports.useredit = (req, res) => {
  const sql = 'UPDATE learn.users SET username=?, password=?, name=?, roles=? where userId=?;'
  const data = req.body

  console.log(data);
  db.query(sql, [data.username, data.password, data.name, data.roles, data.userId], (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.send({
      status: 200,
      message: '更改用户失败',
      data: false
    })

    res.send({
      status: 200,
      message: '更改用户成功',
      data: true
    })
  })
}

// 删除用户
exports.userdelete = (req, res) => {
  const sql = 'DELETE FROM learn.users WHERE userId = ?;'
  console.log(req.body)
  const id = req.body.userId

  db.query(sql, id, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取用户信息失败')

    res.send({
      status: 200,
      message: '获取用户基本信息成功',
      data: results
    })
  })
}

// 新增用户
exports.useradd = (req, res) => {
  console.log(req.body)
  // if(!req.body) res.cc('数据为空')
  const data = req.body

  const sql = `INSERT INTO users (username, password, name, roles) VALUES 
  ('${data.username}', '${data.password}', '${data.name}', '${data.roles}');`

  console.log(sql);

  db.query(sql, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取用户信息失败')

    res.send({
      status: 200,
      message: '获取用户基本信息成功',
      data: results
    })
  })
}

// 用户名验证
exports.uservalidatename = (req, res) => {
  const sql = 'SELECT * FROM learn.users where username = ?;'
  console.log(req.body);
  const username = req.body.username

  db.query(sql, username, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.send({
      status: 200,
      message: '用户名合法',
      data: true
    })

    res.send({
      status: 200,
      message: '用户存在',
      data: false
    })
  })
}

// // 获取教师列表
// exports.userteacherlist = (req, res) => {
//   const sql = `SELECT * FROM learn.users where roles='teacher';`

//   db.query(sql,  (err, results) => {
//     if(err) return res.cc(err)

//     if(results.length === 0) return res.cc('获取教师列表失败')

//     res.send({
//       status: 200,
//       message: '获取教师列表成功',
//       data: results
//     })
//   })
// }