import getStockCodesFromDb from '../db/get-stock-codes.js'
import * as updateStockMAToDb from '../db/update-stocks-ma.js'

const run = async () => {
  console.log("start");
  console.time("runTime");

  // 重建数据表 stocks_ma
  // await updateStockMAToDb.createTable()

  // 获取codes列表
  const codes = (await updateStockMAToDb.getCodes()).map(n => n.code).sort(() => 0.5 - Math.random()) // .slice(0, 10)
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

    const datas = await updateStockMAToDb.getMA(codeArr)

    const updateDatas = ((datas) => {
      const dataMap = new Map()
      datas.forEach(n => {
        const k = JSON.stringify({ code: n.code, date: n.date })
        const v = { val: parseFloat(n.val).toFixed(2), num: n.num, real_num: n.real_num }
        if (dataMap.has(k)) {
          dataMap.set(k, [...dataMap.get(k), v])
        } else {
          dataMap.set(k, [v])
        }
      })
      // console.log('dataMap.length', Array.from(dataMap).length)
      // console.log('dataMap', Array.from(dataMap))

      const ret = []
      for (let [mK, mV] of dataMap) {
        ret.push({
          ...(JSON.parse(mK)),
          ma_values: mV
        })
      }

      return ret

    })(datas)

    // console.log('updateDatas: ', updateDatas)
    // console.log('updateDatas.length:', updateDatas.length)

    await updateStockMAToDb.updateData(updateDatas)

    // for (let data of datas.filter(n => Array.isArray(n))) {
    //   await updateStockDataToDb.updateData(data)
    // }
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
