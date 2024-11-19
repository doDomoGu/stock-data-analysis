import getStockDataFromApi from '../api/getStockData.js'
import getStockCodesFromDb from '../db/get-stock-codes.js'
import updateStockDataToDb from '../db/update-stock-data.js'

const run = async () => {
  console.log("start");
  console.time("runTime");


  const codes = (await getStockCodesFromDb()).sort(() => 0.5 - Math.random()) // .slice(0, 10)
  // return false
  // codes.push({ code: '688573' })

  const total = codes.length
  // console.log('ss', Object.prototype.toString.call(codes), codes, total)
  // return false
  let n = 0
  for (let code of codes.map(n => n.code)) {
    console.log('=============')
    console.log(`${++n} / ${total}`, code)
    console.time(code)
    await updateStockDataToDb.createTable(code)

    const data = await getStockDataFromApi(code)
    console.log('data_rows count:', data.length)
    const onePiece = 100
    const pieceNum = Math.ceil(data.length / onePiece)

    const items = []
    for (let i = 0; i < pieceNum; i++) {
      items.push(data.slice(i * onePiece, i * onePiece + onePiece))
    }

    for (let item of items) {
      await updateStockDataToDb.updateData(code, item)
    }
    console.timeEnd(code)
    console.log(' ')
    await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(Math.random() * 1200)
  }

  console.log("end");
  console.timeEnd("runTime");
};

run();