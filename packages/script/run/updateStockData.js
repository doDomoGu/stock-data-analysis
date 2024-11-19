import getStockDataFromApi from '../api/getStockData.js'
import getStockCodesFromDb from '../db/get-stock-codes.js'
import updateStockDataToDb from '../db/update-stock-data.js'

const run = async () => {
  console.log("start");
  console.time("runTime");

  // 重建数据表 stocks_data
  await updateStockDataToDb.createTable()

  // 获取codes列表
  const codes = (await getStockCodesFromDb()).map(n => n.code).sort(() => 0.5 - Math.random()) // .slice(0, 10)
  // codes.push({ code: '688573' })

  const total = codes.length
  // console.log('ss', Object.prototype.toString.call(codes), codes, total)
  // return false

  // 将codes分片
  const piece = 50
  const pieces = Math.ceil(total / piece)

  const codeArrItems = []
  for (let i = 0; i < pieces; i++) {
    codeArrItems.push(codes.slice(i * piece, i * piece + piece))
  }
  // console.log(codeArrItems.length)
  // console.log(codeArrItems[1])
  let n = 0
  for (let codeArr of codeArrItems) {
    console.log('========')
    console.time('runTimeOne')

    // await Promise.all(codeArr.map(code => updateStockDataToDb.createTable(code)))
    const datas = await Promise.all(codeArr.map(code => getStockDataFromApi(code)))

    for (let data of datas.filter(n => Array.isArray(n))) {
      await updateStockDataToDb.updateData(data)
    }
    // const updateDbItems = []
    // for (let i = 0; i < codeArr.length; i++) {
    //   updateDbItems.push({
    //     code: codeArr[i],
    //     data: datas[i]
    //   })
    // }

    // for (let updateDbItem of updateDbItems) {
    //   await updateStockDataToDb.updateData(updateDbItem.code, updateDbItem.data)
    // }
    n = n + piece
    console.log(`${n} / ${total}`)
    console.timeEnd('runTimeOne')
    console.log(' ')
  }

  // return false
  // let n = 0
  // for (let code of codes) {
  //   console.log('=============')
  //   console.log(`${++n} / ${total}`, code)
  //   console.time(code)
  //   await updateStockDataToDb.createTable(code)

  //   const data = await getStockDataFromApi(code)
  //   console.log('data_rows count:', data.length)
  //   const onePiece = 100
  //   const pieceNum = Math.ceil(data.length / onePiece)

  //   const items = []
  //   for (let i = 0; i < pieceNum; i++) {
  //     items.push(data.slice(i * onePiece, i * onePiece + onePiece))
  //   }

  //   for (let item of items) {
  //     await updateStockDataToDb.updateData(code, item)
  //   }
  //   console.timeEnd(code)
  //   console.log(' ')
  //   await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(Math.random() * 1200)
  // }

  console.log("end");
  console.timeEnd("runTime");
};

run();