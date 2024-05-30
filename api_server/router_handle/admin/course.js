const db = require("../../db")

// 获取课程列表
exports.courselist = (req, res) => {
  const sql = 'SELECT * FROM learn.course join learn.users on course.userId=users.userId;'

  db.query(sql,  (err, results) => {
    if(err) return res.cc(err)

    if(results.length === 0) return res.cc('获取课程列表失败')

    res.send({
      status: 200,
      message: '获取课程列表成功',
      data: results
    })
  })
}

// 课程新增
exports.courseadd = (req, res) => {
  // console.log(req.body)
  // if(!req.body) res.cc('数据为空')
  const data = req.body
  console.log(data);
  const url = `http://localhost:3000/${data.url}`
  const sql = `INSERT INTO course (coursename, url, userId) VALUES 
  ('${data.coursename}', '${url}', '${data.userId}');`

  db.query(sql, (err, results) => {

    if(err) return res.cc(err)
    console.log(results);
    if(results.length === 0) return res.cc('获取用户信息失败')

    res.send({
      status: 200,
      message: '获取用户基本信息成功',
      data: results
    })
  })
}

// 课程搜索
exports.coursesearch = (req, res) => {
  const sql = 'SELECT * FROM learn.course where coursename = ?;'

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
exports.coursedelete = (req, res) => {
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
exports.courseedit = (req, res) => {
  const sql = 'UPDATE learn.course SET coursename=?, userId=?, url=? where couseid=?;'
  const data = req.body
  const url = `http://localhost:3000/${data.url}`
  
  db.query(sql, [data.coursename, data.userId, url, data.couseid], (err, results) => {
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


