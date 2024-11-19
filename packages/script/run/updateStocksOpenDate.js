import getStocksOpenDateFromApi from '../api/getStocksOpenDate.js'
import getStockCodesFromDb from '../db/get-stock-codes.js'
import updateOpenDateToDb from '../db/update-stocks-open-date.js'

const run = async () => {
  console.log("start");
  console.time("runTime");


  // const data = await getStocksOpenDateFromApi('000001')
  // console.log(data)
  // const data2 = await getStocksOpenDateFromApi('835892')
  // console.log(data2)
  // return false

  const codes = (await getStockCodesFromDb()).sort(() => 0.5 - Math.random())
  // console.log(codes)

  // const data = await getData()
  const total = codes.length
  const onePiece = 200
  const pieceNum = Math.ceil(total / onePiece)

  // 将codes分片
  const items = []
  for (let i = 0; i < pieceNum; i++) {
    items.push(codes.slice(i * onePiece, i * onePiece + onePiece))
  }
  let n = 0
  for (let item of items) {
    const updateData = []

    console.log(`${++n * onePiece}/${total}`, item[0].code)

    const functions = []

    for (let code of item.map(n => n.code)) {
      // const data = await getStocksOpenDateFromApi(code)
      // updateData.push(`('${data.code}','${data.open_date}','${data.is_open}' )`)
      functions.push(getStocksOpenDateFromApi(code))
    }

    const results = await Promise.all(functions)
    results.filter(n => n != false).map(data => {
      // updateData.push(`('${data.code}','${data.open_date}','${data.is_open}' )`)
      updateData.push(`('${data.code}','${data.open_date}')`)
    })
    // console.log(updateData)
    if (updateData.length > 0) {
      await updateOpenDateToDb.updateOpenDate(updateData)
    }

    await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(Math.random() * 200)

    // return false
  }

  await updateOpenDateToDb.updateOpenDate2Stocks()



  console.log("end");
  console.timeEnd("runTime");
};

run();