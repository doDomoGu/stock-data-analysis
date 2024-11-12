// import { write as writeFile } from "./utils/file.js";
// import stockListSettings from "./settings/stockList.js";
// import dayjs from 'dayjs'
import getInfo from '../api/single-stock-info.js'
import updateStocks from '../db/update-stocks.js'

const run = async () => {
  console.log("start");
  console.time("runTime");

  const startNo = 600000
  const updateOnePiece = 100 // 可以把10000 整除
  const outsideNo = 100000 / updateOnePiece
  for (let i = 0; i < outsideNo; i++) {
    const funcs = []
    for (let j = 0; j < updateOnePiece; j++) {
      funcs.push(
        (async (stockCode) => {
          const info = await getInfo(stockCode);
          return info
        })(String(startNo + (i * updateOnePiece + j)))
      )
    }

    const results = await Promise.all(funcs)
    // console.log(results)
    const filterResults = results.filter(n => n != false)
    // console.log(startNo + (i * updateOnePiece), ': ', results.length, '/', filterResults.length)
    if (filterResults.length > 0) {
      updateStocks(filterResults)
    }
  }



  // const info = await getInfo('604000');
  // console.log(info)
  console.log("end");
  console.timeEnd("runTime");
};

run();