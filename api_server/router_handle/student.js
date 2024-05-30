const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const permission = require('../utils/permission')
const config = require('../config')
const base64 = require('../utils/base64')

// 获取课程列表
exports.courselist =  (req, res) => {
  const token = req.headers['x-token']
  const userinfo = jwt.verify(token, config.jwtSecretKey)

  const userId = userinfo.userId

  // const sql = `SELECT * FROM learn.studentcourse join learn.course on learn.course.couseid = learn.studentcourse.courseid where studentcourse.userid = ?`
  const sql = `SELECT * FROM learn.course where couseid in (select distinct courseid from studentcourse where userid = ?);`

  db.query(sql, userId, (err, results) => {
    if(err) return res.cc(err)

    res.send({
      status: 200,
      message: '获取成功',
      data: results
    })
  })
}

exports.paperlist = (req, res) => {
  const token = req.headers['x-token']
  const userinfo = jwt.verify(token, config.jwtSecretKey)

  const userId = userinfo.userId

  const sql = 'select * from paper join course on course.couseid = paper.courseid  join users on users.userId = paper.userid where courseid in (select distinct courseid from studentcourse where userid=? ) '

  db.query(sql, userId, (err, results) => {
    if(err) return res.cc(err)

    res.send({
      status: 200,
      message: '获取成功',
      data: results
    })
  })
}


exports.questionlist = (req, res) => {
  const data = req.body

  const sql = 'select * from question where paperid=?'

  db.query(sql, data.paperid, (err, results) => {
    if(err) return res.cc(err)

    res.send({
      status: 200,
      message: '获取成功',
      data: results
    })
  })
}


exports.submitscore = (req, res) => {
  const token = req.headers['x-token']
  const userinfo = jwt.verify(token, config.jwtSecretKey)

  const userId = userinfo.userId
  const data = req.body
  const paperid = data.paper.paperid 
  const submit = data.submit
  let score = 0

  const sql = 'select questionid, answer,score from question where paperid = ?'
  db.query(sql, paperid, (err, results) => {
    
    results.forEach(element => {
      const userAnswer = submit[element.questionid]
      const answer = element.answer
      if(userAnswer === answer) {
        score += parseInt(element.score) 
      }
    });
    const sql = `insert into score (userid, paperid, score) values (?,?,?)`
    db.query(sql, [userId, paperid, score], (err, results) => {
      if(err) return res.cc(err)

      if(results.length === 0) return res.cc('获取教师列表失败')

      res.send({
        status: 200,
        message: `你的得分是: ${score}分`,
        data: true
      })
    })
  })
  
}
