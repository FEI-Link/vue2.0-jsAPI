const db = require("../../db")
const jwt = require('jsonwebtoken')
const config = require('../../config')
const date = require('../../utils/date')
const dayjs = require('dayjs')
function getTeacherInfo(req) {
  return jwt.verify(req.headers['x-token'], config.jwtSecretKey)
}

// 获取课程列表
exports.list = (req, res) => {
  const userinfo = getTeacherInfo(req)

  if(userinfo.roles === 'all') {
    const sql = 'select * from learn.course'

    db.query(sql,  (err, results) => {
      if(err) return res.cc(err)
  
      if(results.length === 0) return res.cc('获取课程列表失败')
  
      res.send({
        status: 200,
        message: '获取课程列表成功',
        data: results
      })
    })
  } else if(userinfo.roles === 'teacher') {
    sql = `select * from learn.course where userId = ${userinfo.userId}`

    db.query(sql,  (err, results) => {
      if(err) return res.cc(err)
  
      if(results.length === 0) return res.cc('获取课程列表失败')
  
      res.send({
        status: 200,
        message: '获取课程列表成功',
        data: results
      })
    })
  } else {
    res.cc('error')
  }
}

// 课程新增
exports.create = (req, res) => {
  const userId = getTeacherInfo(req).userId
  
  const data = req.body

  const url = `http://localhost:3000/${data.url}`
  const sql = `INSERT INTO course (coursename, url, userId) VALUES 
  ('${data.coursename}', '${url}', '${userId}');`

  db.query(sql, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('新增课程失败')

    res.send({
      status: 200,
      message: '新增课程成功',
      data: results
    })
  })
}

// 课程搜索
exports.search = (req, res) => {
  const info = getTeacherInfo(req)

  const sql = `SELECT * FROM learn.course where coursename = ? and userId='${info.userId}';`

  db.query(sql, req.body.coursename,  (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('无')

    res.send({
      status: 200,
      message: '搜索成功',
      data: results
    })
  })
}

// 课程删除
exports.delete = (req, res) => {
  const sql = 'DELETE FROM learn.course WHERE couseid=?;'

  const id = req.body.couseid

  db.query(sql, id, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('删除失败')

    res.send({
      status: 200,
      message: '删除成功',
      data: true
    })
  })
}

// 课程编辑
exports.edit = (req, res) => {
  console.log(req.body);
  const sql = 'UPDATE learn.course SET coursename=?, url=? where couseid=?;'
  const data = req.body
  const url = `http://localhost:3000/${data.url}`
  
  db.query(sql, [data.coursename, url, data.couseid], (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.send({
      status: 200,
      message: '更改课程失败',
      data: false
    })

    res.send({
      status: 200,
      message: '更改课程成功',
      data: true
    })
  })
}

// 添加学生
exports.addStudent = (req, res) => {
  console.log(req.body);
  const sql = `insert into studentcourse (userid, courseid) values (?, ?) `
  db.query(sql, [req.body.userId, req.body.courseid], (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.send({
      status: 200,
      message: '添加学生失败',
      data: false
    })

    res.send({
      status: 200,
      message: '添加学生成功',
      data: true
    })
  })
}

// 创建试卷
exports.addPaper = (req, res) => {
  const userinfo = getTeacherInfo(req)
  const nowTime = date.nowTime()
  const data = req.body
  const nowDate = dayjs().format('YYYY-MM-DD')
  const begintime = `${nowDate} ${data.begintime}`
  const endtime = `${nowDate} ${data.endtime}`
  const sql = `insert into paper (papername, createtime, begintime, endtime, userid, courseid) values (?, '${nowTime}', ?, ?, '${userinfo.userId}', ?);`
  console.log(sql);

  db.query(sql, [data.papername, begintime, endtime, data.courseid], (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.send({
      status: 200,
      message: '创建试卷失败',
      data: false
    })

    res.send({
      status: 200,
      message: '创建试卷成功',
      data: true
    })
  })
}

// 创建试题
exports.addQuestion = (req, res) => {
  const data = req.body

  const sql = `insert into question (questionname, choice1, choice2, choice3, choice4, answer, paperid, score) values (?, ?, ?, ?, ?, ?, ?, ?);`

  db.query(sql, [data.questionname, data.choice1, data.choice2, data.choice3, data.choice4, data.answer, data.paperid, data.score], (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.send({
      status: 200,
      message: '创建试题失败',
      data: false
    })

    res.send({
      status: 200,
      message: '创建试题成功',
      data: true
    })
  })
}

exports.getPaperList = (req, res) => {
  const data = req.body
  const sql = `select * from learn.paper where courseid=?`
  db.query(sql, data.courseid, (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取教师列表失败')

    res.send({
      status: 200,
      message: '获取教师列表成功',
      data: results
    })
  })
}


