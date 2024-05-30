const dayjs = require('dayjs')

// console.log(dayjs(new Date('2022-12-12 02:54:07')).format('YYYY-MM-DD HH:mm:ss'));
// console.log(dayjs(new Date('2022-12-12 02:54:07')));

exports.dateFormat = date => { return dayjs(date).format('YYYY-MM-DD HH:mm:ss') }

exports.diffTime = (start, end) => {
  const startTime = dayjs(start)
  const endTime = dayjs(end)
  return endTime.diff(startTime, 'second')
}

exports.nowTime = () => { return dayjs().format('YYYY-MM-DD HH:mm:ss') }


const diffTime = (start, end) => {
  const startTime = dayjs(start)
  const endTime = dayjs(end)
  return endTime.diff(startTime, 'second')
}

// console.log(dayjs('2022-12-02 01:54:07'));
// console.log(dayjs(diffTime('2022-12-03 02:30:00', '2022-12-03 04:30:00')).format('HH:mm'));