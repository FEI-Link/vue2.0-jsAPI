const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const permission = require('../utils/permission')
const config = require('../config')
const base64 = require('../utils/base64')
const dayjs = require('dayjs')
function getInfo(req) {
  return jwt.verify(req.headers['x-token'], config.jwtSecretKey)
}

exports.paperlist =  (req, res) => {
  // const sql = `SELECT * FROM learn.studentcourse join learn.course on learn.course.couseid = learn.studentcourse.courseid where studentcourse.userid = ?`
  const userinfo = getInfo(req)
  
  if(userinfo.roles == 'user') {
    const sql = `SELECT * FROM learn.paper where name = ?;`

    db.query(sql, userinfo.name, (err, results) => {
      if(err) return res.cc(err)

      res.send({
        status: 200,
        message: '获取成功',
        data: results
      })
    })
  }

  if(userinfo.roles == 'designer' || userinfo.roles == 'admin') {
    const sql = `SELECT * FROM learn.paper;`

    db.query(sql, (err, results) => {
      if(err) return res.cc(err)

      res.send({
        status: 200,
        message: '获取成功',
        data: results
      })
    })
  }
  
  
  
}

exports.delpaper =  (req, res) => {
  const sql = `DELETE FROM learn.paper where paperid = ?;`

  const id = req.body.id

  db.query(sql, id, (err, results) => {
    if(err) return res.cc(err)

    if(results.length == 0) return res.cc('删除失败')

    res.send({
      status: 200,
      message: '获取成功',
      data: true
    })
  })
}


exports.createpaper =  (req, res) => {
  const userinfo = getInfo(req)
  console.log(req.body)
  
  let p = 0;
  for(let i = 0; i < req.body.url.length; i++) {
    if(req.body.url[i] == '\\') {
      p = i
    }
  }

  const url = `http://localhost:3000/img/${req.body.url.slice(p)}`
  console.log('url', url)
  const sql = `INSERT INTO learn.paper (papername, name, createtime, imgsrc) VALUES 
  ('${req.body.papername}', '${userinfo.name}', '${dayjs().format('YYYY-MM-DD HH:mm:ss')}', '${url}');`



  db.query(sql, (err, results) => {
    if(err) return res.cc(err)

    if(results.length == 0) return res.cc('删除失败')

    res.send({
      status: 200,
      message: '获取成功',
      data: true
    })
  })
}

exports.getplanbypaperid =  (req, res) => {
  // const sql = `SELECT * FROM learn.studentcourse join learn.course on learn.course.couseid = learn.studentcourse.courseid where studentcourse.userid = ?`
  const userinfo = getInfo(req)
  console.log(userinfo)
  console.log(req.body.id)
  
  const sql = `SELECT * FROM learn.plan where paperid = ? order by ord ;`

  db.query(sql, req.body.id, (err, results) => {
    if(err) return res.cc(err)
      console.log(results.length);
    res.send({
      status: 200,
      message: '获取成功',
      data: results
    })
  })
  
}

exports.addplan =  (req, res) => {
  const userinfo = getInfo(req)

  const sql = `INSERT INTO learn.plan (paperid, userid, surface, size, level, ra, scheme, ord) VALUES 
  ('${req.body.paperid}', '${userinfo.userId}', '${req.body.surface}', '${req.body.size}',  '${req.body.level}', '${req.body.ra}', '${req.body.scheme}', '${req.body.ord}');`


  db.query(sql, (err, results) => {
    if(err) return res.cc(err)

    if(results.length == 0) return res.cc('新增工序失败')

    res.send({
      status: 200,
      message: '获取成功',
      data: true
    })
  })
}


exports.downplan =  (req, res) => {
  const planid = req.body.id
  
  const sql = 'select * from learn.plan where planid = ?'
  db.query(sql, planid, (err, results) => {
    console.log(results)
    let ord = results[0].ord

    const sql = `select * from learn.plan where ord = ${ord+1} and paperid = ${results[0].paperid}`
    db.query(sql, (err, results) => {
      console.log(results)
      
      const sql1 = `UPDATE learn.plan SET ord=${results[0].ord-1} where planid=${results[0].planid};`
      db.query(sql1, (err, results) => {
        console.log(results)

        const sql2 = `UPDATE learn.plan SET ord=${ord+1} where planid=${planid};`
        db.query(sql2,  (err, results) => {
    console.log(results)

          if(err) return res.cc(err)

          if(results.length == 0) return res.cc('新增工序失败')
      
          res.send({
            status: 200,
            message: '获取成功',
            data: true
          })
  
        })
      })
    }) 
  })
}

exports.upplan =  (req, res) => {
  const planid = req.body.id
  
  const sql = 'select * from learn.plan where planid = ?'
  db.query(sql, planid, (err, results) => {
    console.log(results)
    let ord = results[0].ord

    const sql = `select * from learn.plan where ord = ${ord-1} and paperid = ${results[0].paperid}`
    db.query(sql, (err, results) => {
      console.log(results)
      
      const sql1 = `UPDATE learn.plan SET ord=${results[0].ord+1} where planid=${results[0].planid};`
      db.query(sql1, (err, results) => {
        console.log(results)

        const sql2 = `UPDATE learn.plan SET ord=${ord-1} where planid=${planid};`
        db.query(sql2,  (err, results) => {
    console.log(results)

          if(err) return res.cc(err)

          if(results.length == 0) return res.cc('新增工序失败')
      
          res.send({
            status: 200,
            message: '获取成功',
            data: true
          })
  
        })
      })
    }) 
  })
}


exports.delplan =  (req, res) => {
  const sql = `DELETE FROM learn.plan where planid = ?;`

  const id = req.body.id

  db.query(sql, id, (err, results) => {
    if(err) return res.cc(err)

    if(results.length == 0) return res.cc('删除失败')

    res.send({
      status: 200,
      message: '获取成功',
      data: true
    })
  })
}
