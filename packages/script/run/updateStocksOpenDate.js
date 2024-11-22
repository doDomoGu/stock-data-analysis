import getStocksOpenDateFromApi from '../api/getStocksOpenDate.js'
import * as updateOpenDateToDb from '../db/update-stocks-open-date.js'

const run = async () => {
  console.log("start");
  console.time("runTime");


  // const data = await getStocksOpenDateFromApi('000001')
  // console.log(data)
  // const data2 = await getStocksOpenDateFromApi('835892')
  // console.log(data2)
  // return false

  // const codes = (await getStockCodesFromDb()).sort(() => 0.5 - Math.random())


  const codes = (await updateOpenDateToDb.getCodes()).map(n => n.code).sort(() => 0.5 - Math.random())
  // console.log(codes)

  // const data = await getData()
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

    const results = await Promise.all(codeArr.map(code => getStocksOpenDateFromApi(code)))

    const updateDatas = results.filter(n => n && n.open_date != null)
    // .map(n => ({
    //   code: n.code,
    //   open_date: n.open_date
    // }))

    // process.exit(0)
    // console.log(updateData)
    if (updateDatas.length > 0) {
      await updateOpenDateToDb.updateData(updateDatas)
    }

    // await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(Math.random() * 200)


    n = n + piece
    console.log(`${n} / ${total}`)
    console.timeEnd('runTimeOne')
    console.log(' ')
  }


  console.log("end");
  console.timeEnd("runTime");
  process.exit(0)
};

run();