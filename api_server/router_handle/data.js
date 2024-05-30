const db = require("../db/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config");

exports.getList = (req, res) => {
  const data = req.body;
  console.log(data);
  const sql = `select location.*, count(scan_info.locationid) as 'number'
  from scan_info join location 
  on location.locationid = scan_info.locationid
  where location.school_location= ?
  and scantime between ? and ? 
  Group by locationid`;
  db.query(sql, [data.school, data.startTime, data.endTime], (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) return res.send({
      status: 200,
      message: "查询成功",
      data: null
    })
    res.send({
      status: 200,
      message: "查询成功",
      data: results,
    });
  }); 
};

exports.getDetailList = (req, res) => {
  const data = req.body;

  if(data.locationid) {
    // 模糊查询是否存在
    if(data.dimstr) {
      console.log('都存在')
      const sql = `select scantime, student.*, merge_location
      from scan_info 
      join location 
      on location.locationid = scan_info.locationid
      join student
      on student.stdid = scan_info.stdid
      where location.locationid=?
      and scantime between ? and ?
      and (student.stdid = ? or student.stdname = ?)`
      
      const arr = [data.locationid, data.startTime, data.endTime, data.dimstr, data.dimstr]
      return detailSearchHandle(sql, arr, data, res)
    }
    const sql = `select scantime, student.*, merge_location
    from scan_info 
    join location 
    on location.locationid = scan_info.locationid
    join student
    on student.stdid = scan_info.stdid
    where location.locationid=?
    and scantime between ? and ?`
    const arr = [data.locationid, data.startTime, data.endTime]
    return detailSearchHandle(sql, arr, data, res)
  } else if(data.dimstr) {
    const sql = `select scantime, student.*, merge_location
    from scan_info 
    join location 
    on location.locationid = scan_info.locationid
    join student
    on student.stdid = scan_info.stdid
    where scantime between ? and ?
    and (student.stdid = ? or student.stdname = ?)`
    
    const arr = [data.startTime, data.endTime, data.dimstr, data.dimstr]
    return detailSearchHandle(sql, arr, data, res)
  } else {
    const sql =  `select scantime, student.*, merge_location
    from scan_info 
    join location 
    on location.locationid = scan_info.locationid
    join student
    on student.stdid = scan_info.stdid
    where location.school_location=?
    and scantime between ? and ?`
    const arr = [data.school, data.startTime, data.endTime]
    return detailSearchHandle(sql, arr, data, res)
  }

  

  // if(data.detail_location) {
  //   const str = `and location.detail_location = '${data.detail_location}'`
  //   sql = `${sql} ${str}`
  //   db.query(sql, [data.school, data.startTime, data.endTime, data.detail_locaiton], (err, results) => {
  //     if (err) return res.cc(err);
  //     if (results.length === 0) return res.cc("无数据", 200);
  //     res.send({
  //       status: 200,
  //       message: "查询成功",
  //       data: results,
  //     });
  //   });
  // }else if(data.locationid) {
  //   const idsql = `select scantime, student.*, merge_location
  //   from scan_info 
  //   join location 
  //   on location.locationid = scan_info.locationid
  //   join student
  //   on student.stdid = scan_info.stdid
  //   where location.locationid=?
  //   and scantime between ? and ?`
    


  // } else {
  //   db.query(sql, [data.school, data.startTime, data.endTime], (err, results) => {
  //     if (err) return res.cc(err);
  //     if (results.length === 0) return res.cc("无数据", 200);
  //     const size = parseInt(data.size)
  //     const page = parseInt(data.page)
  //     console.log(this.page);
  //     // console.log(size * page, size * page + size);
  //     // console.log(results.length/size);
  //     // console.log(results.slice(size * page, size * page + size).length)
  //     const arrList = results.slice(size * page, size * page + size)
  //     const totalPage = results.length % size === 0 ? results.length / size : (results.length / size) + 1
  //     res.send({
  //       status: 200,
  //       message: "查询成功",
  //       data: {
  //         total: results.length,
  //         list: arrList,
  //         currentPage: page,
  //         pageSize: size,
  //         totalPage
  //       },
  //     });
  //   });
  // }
  // // res.send({
  // //   status: 200,
  // //   message: "查询成功",
  // //   data: sql
  // // });
  
};
// 可疑人员
exports.doubtPersonList = (req, res) => {
  // data 请求数据/参考数据 stdid location(merge_location) time(scantime)
  const query = req.query;
  const sql = `select * from scan_info
  join location 
  on location.locationid = scan_info.locationid
  join student
  on student.stdid = scan_info.stdid
  where student.stdid in (
  select stdid
  from scan_info
  where locationid in (select locationid from location where merge_location = '旅顺口校区4号公寓') 
  )  
  `

  const sql11 = `select * from location`
  db.query(sql11, (err, results) => {
    const locationArray = results
    db.query(sql, [query.location], (err, results) => {
      // 格式化后的这个人的扫描时间
      const time = new Date(query.time).getTime()
      // 在这个人之前到和他地点一样的人的学号
      const set = new Set()
      // 在这个人之前到和他地点一样的人的所有信息 scanid locationid scantime stdid
      const map = []
  
      // 计算出在他之前到达他地点的人，把数据存到set和map中
      for (let item of results) {
        let itemTime = item.scantime.getTime()
        if(time >= itemTime) {
          set.add(item.stdid)
          map.push(item)
        }
      }
      // 对每个人进行判断，
      for (let id of set) {
        // 找出这个人的所有数据
        let arr = []  // arr判断最小差值，得到最近的时间点
      
        let data = [] // 存完整数据
  
  
        // 找到这个人的数据
        for(let i in map) {
          const item1 = map[i]
          if(item1.stdid == id) {
            let cha = time - item1.scantime.getTime()
            arr.push([cha, item1.scantime])
            data.push(item1)
          }
        }
  
        // 比较，找出最小差值
        let cha = arr[0][0] // 最小差值
  
        let index = 0 // 在data中的索引
  
        for (let i = 1; i < arr.length; i++) {
          if(arr[i][0] < cha) {
            cha = arr[i][0]
            index = i
          }
        }
  
        // 现在已经知道最近的时间了，向data去匹配，拿到完整的数据
        let personTime = arr[index][1]  // 最近时间
        for(let i = 0; i < data.length; i++) {
          // 找到这个人的最近时间的完整数据
          let mergeLocationRes;
          if(data[i].scantime == personTime) {
            // 找到之后去查询locationid对应的地址全名
            for(let j = 0; j < locationArray.length; j++) {
              if(locationArray[j].locationid == data[i].locationid) {
                mergeLocationRes = locationArray[j].merge_location
              }
            }
          }
          if(mergeLocationRes !== query.location) {
            set.delete(id)
          }
        }
      }
      return res.send({
        status: 200,
        message: "查询成功",
        data: {
          list: Array.from(set),
          data: results
        },
      });
    })
  })
}

const numPromise = function(locationid, frontTime, behindTime) {
  return new Promise((resolve, reject) => {
    const sql = `select *
    from scan_info 
    join location 
    on location.locationid = scan_info.locationid
    join student
    on student.stdid = scan_info.stdid
    where location.locationid=?
    and scantime between ? and ?`
    
    db.query(sql, [locationid, frontTime, behindTime], (err, results) => {
      if(err) reject(err)
      // const stunum = results[0].stunum
      
      resolve(results)
    })
  })
}


// 近半小时同行名单
exports.peopleRoadList = (req, res) => {
  console.log(req.query)
  // const time = new Date(req.query.time)
  // const frontTime = new Date(time.getTime() - 30 * 60 * 1000) 
  // const behindTime = new Date(time.getTime() + 30 * 60 * 1000)
  const sql = `select * from student where stdid = ${req.query.stdid}`
  db.query(sql, (err, results) => {
    const sql11 = `select * from location`
    const studentInfo = results[0]

    db.query(sql11, (err, results) => {
      const locationArray = results
      const sql =`select * from scan_info where stdid = ?`

      db.query(sql, req.query.stdid, (err, results) => {
        let arr = []
        async function search() {
          for(let i =0; i < results.length; i++) {
            let obj = {}
            locationArray.forEach(element => {
              if(element.locationid == results[i].locationid){
                obj.location = element.merge_location
                return
              }
            })

            let scantime = new Date(results[i].scantime)
            obj.scantime = scantime
            let frontTime = new Date(scantime.getTime() - 30 * 60 * 1000) 
            let behindTime = new Date(scantime.getTime() + 30 * 60 * 1000)
            let locationid = results[i].locationid
            
            await numPromise(locationid, frontTime, behindTime).then(res => {
              obj.list = res
              obj.num = res.length
              arr.push(obj)
            })
        }}
        search().then(() => {
          res.send({
            status: 200,
            message: "查询成功",
            data: {
              countList: arr,
              studentInfo
            }
          })
        })
      })
    


      
        
      

        

    })
    })
  
}


const detailSearchHandle = function(sql, arr, data, res) {
  db.query(sql, arr, (err, results) => {
    if (err) return res.cc(err);
    // if (results.length === 0) return res.cc("无数据", 200);
    const size = parseInt(data.size)
    const page = parseInt(data.page)
    if (results.length === 0) return res.send({
      status: 200,
      message: "查询成功",
      data: {
        total: 0,
        list: [],
        currentPage: page,
        pageSize: size,
      }, 
    })
    
    // console.log(size * page, size * page + size);
    // console.log(results.length/size);
    // console.log(results.slice(size * page, size * page + size).length)
    const arrList = results.slice(size * page, size * page + size)
    // const totalPage = results.length % size === 0 ? results.length / size : (results.length / size) + 1
    res.send({
      status: 200,
      message: "查询成功",
      data: {
        total: results.length,
        list: arrList,
        currentPage: page,
        pageSize: size,
      },
    });
  });
}

// 查询相同地点的名单
const commonLocationList = (location) => {
  const sql = `select * from scan_info
  where stdid in (
  select stdid
  from scan_info
  where locationid in (select locationid from location where merge_location = ?) 
  )
  `

  db.query(sql, [location], (err, results) => {
    return results
  })
  return 

}