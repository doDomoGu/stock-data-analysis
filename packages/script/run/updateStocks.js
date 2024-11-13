import getData from '../api/getStockList.js'
import updateStocks from '../db/update-stocks.js'

const run = async () => {
  console.log("start");
  console.time("runTime");


  // { "f1": 2, "f2": 11.61, "f3": 0.61, "f4": 0.07, "f5": 1086263, "f6": 1260161857.32, "f7": 1.91, "f8": 0.56, "f9": 4.25, "f10": 0.62, "f11": 0.0, "f12": "000001", "f13": 0, "f14": "平安银行", "f15": 11.7, "f16": 11.48, "f17": 11.5, "f18": 11.54, "f20": 225302710279, "f21": 225299219500, "f22": 0.0, "f23": 0.54, "f24": 18.95, "f25": 37.72, "f62": 7308480.0, "f115": 4.84, "f128": "-", "f140": "-", "f141": "-", "f136": "-", "f152": 2 }
  const data = await getData()

  // await updateStocks()

  const onePiece = 200
  const pieceNum = Math.ceil(data.length / onePiece)

  const items = []
  for (let i = 0; i < pieceNum; i++) {
    items.push(data.slice(i * onePiece, i * onePiece + onePiece))
  }

  for (let item of items) {
    await updateStocks(item)
  }

  console.log("end");
  console.timeEnd("runTime");
};

run();