import dayjs from 'dayjs'
import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import path from 'path'
import holiday from './holiday.js'

console.time('runTime')
let dataArr = []
const startDate = dayjs('2010-01-01')

// const endDate = dayjs("2021-01-31");
const endDate = dayjs()

const dayLength = endDate.diff(startDate, 'd') + 1

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
  //   console.log(holiday, date.format("YYYY-MM-DD"));
  //   console.log(
  //     "date:",
  //     date.format("YYYY-MM-DD"),
  //     // date.format("ddd"),
  //     `星期${weekdayMap[weekdayNum]}`,
  //     isRight ? "ok" : "not"
  //   );
  //   txt +=
  //     `date:\t` +
  //     `${date.format("YYYY-MM-DD")}\t` +
  //     `星期${weekdayMap[weekdayNum]}\t` +
  //     `${isOpen ? "ok" : "not"}\t` +
  //     `\n`;
  dataArr.push({
    date: date.format('YYYY-MM-DD'),
    weekday: `星期${weekdayMap[weekdayNum]}`,
    isOpen
  })
}

async function checkAndCreateDir(dirPath) {
  try {
    // 检查目录是否存在
    await access(dirPath)
    // console.log(`目录 ${dirPath} 已存在`);
  } catch {
    // 目录不存在，创建目录
    // console.log(`目录 ${dirPath} 不存在，创建它`);
    await mkdir(dirPath, { recursive: true })
  }
}

async function saveData(filePath, content) {
  try {
    const dirPath = path.parse(filePath).dir
    await checkAndCreateDir(dirPath)
    await writeFile(filePath, content) // 异步写入文件
    console.log('数据已保存到文件')
  } catch (error) {
    console.error('发生错误:', error)
  }
}

saveData('./calendar/data.json', JSON.stringify(dataArr)) // 调用函数
console.log(dataArr.filter((n) => n.isOpen).length)
console.timeEnd('runTime')
