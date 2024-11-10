import dayjs from 'dayjs'
import holiday from './holiday.js'
import connection from '../utils/db.js'

console.time('runTime')
let dataArr = []
const startDate = dayjs('2020-01-01')

// const endDate = dayjs("2021-01-31");
const endDate = dayjs() // 默认当天

const dayLength = endDate.diff(startDate, 'd') + 1
console.log({ dayLength })
const weekdayMap = ['日', '一', '二', '三', '四', '五', '六']

for (let i = 0; i < dayLength; i++) {
  const date = startDate.add(i, 'day')

  const weekdayNum = date.format('d')

  let isOpen = true
  if (weekdayNum == 0 || weekdayNum == 6) {
    isOpen = false
  }
  if (holiday.includes(date.format('YYYY-MM-DD'))) {
    isOpen = false
  }
  // dataArr.push({
  //   date: date.format('YYYY-MM-DD'),
  //   is_open: isOpen ? 1 : 0,
  //   weekday: weekdayNum,
  //   weekday_cn: `星期${weekdayMap[weekdayNum]}`,
  // })

  dataArr.push(
    `('${date.format('YYYY-MM-DD')}',${isOpen ? 1 : 0},${weekdayNum},'星期${weekdayMap[weekdayNum]}')`
  )
}

const pieceNum = 200
const len = Math.ceil(dataArr.length / pieceNum)

const queryDataArr = []
for (let i = 0; i < len; i++) {
  queryDataArr.push(
    dataArr.slice(pieceNum * i, pieceNum * i + pieceNum).join(',')
  )
}

try {
  await connection.query('truncate table `calendar`')
  let t = 1
  for (let item of queryDataArr) {
    const queryStr =
      'replace into `calendar` (date, is_open, weekday, weekday_cn) values ' +
      item

    const [results] = await connection.query(queryStr)
    // console.log(results);
    console.log(t)
    t++
  }
} catch (err) {
  console.log(err)
}

console.timeEnd('runTime')
