import getStocksFromApi from '../api/getStocks.js'
import updateStocksToDb from '../db/update-stocks.js'

const run = async () => {
  console.log("start");
  console.time("runTime");


  const data = await getStocksFromApi()

  const onePiece = 200
  const pieceNum = Math.ceil(data.length / onePiece)

  const items = []
  for (let i = 0; i < pieceNum; i++) {
    items.push(data.slice(i * onePiece, i * onePiece + onePiece))
  }

  for (let item of items) {
    await updateStocksToDb(item)
  }

  console.log("end");
  console.timeEnd("runTime");

  process.exit(0)
};

run();