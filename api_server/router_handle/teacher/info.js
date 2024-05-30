const db = require("../../db")

// 获取学生列表
exports.userstudentlist = (req, res) => {
  const sql = `SELECT * FROM learn.users where roles='student';`

  db.query(sql,  (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取教师列表失败')

    res.send({
      status: 200,
      message: '获取教师列表成功',
      data: results
    })
  })
}

// 获取个人信息
exports.teacherInfo = (req, res) => {
  const sql = `SELECT * FROM learn.users where userId=?;`

  db.query(sql, req.body.userId, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取教师列表失败')

    res.send({
      status: 200,
      message: '获取教师列表成功',
      data: results
    })
  })
}

// 获取个人信息
exports.studentlist = (req, res) => {
  const sql = `select * from learn.users where userid in (select distinct userid from studentcourse where courseid = ?)`
  // const sql = `SELECT * FROM learn.studentcourse join learn.users on users.userId = studentcourse.userid where courseid=?;`

  db.query(sql, req.body.courseid, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取教师列表失败')

    res.send({
      status: 200,
      message: '获取教师列表成功',
      data: results
    })
  })
}