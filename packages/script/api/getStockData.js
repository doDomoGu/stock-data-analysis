// 根据StockCode 获取 历史数据(K线)
import request from "../utils/request.js";
import dayjs from 'dayjs'

// import { append as appendFile } from "./utils/file.js";

const getData = async (stockCode, limit = 1000) => {
  const url = "https://push2his.eastmoney.com/api/qt/stock/kline/get";

  const params = {
    // cb: "jQuery35109876909032935408_1730805894931",
    //   secid: "0.300339",
    // ut: "fa5fd1943c7b386f172d6893dbfba10b",
    fields1: "f1,f2,f3,f4,f5,f6",
    fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61",
    klt: "101",
    fqt: "1",
    end: "20500101",
    // lmt: 120,
    // _: "1730805894945",
  };


  const res = await request.get(url, {
    params: {
      ...params,
      secid: (stockCode[0] == "6" ? "1" : "0") + "." + stockCode,
      lmt: limit, // 获取历史n天数据
    },
  });
  // console.log(res);
  // return false
  if (res && res.data && res.data.klines) {
    const klines = res.data.klines
    // const klinesCount = klines.length
    // console.log("klines count: ", klines.length);
    // return false
    // console.log("klines item0:", klines.slice(0, 10));

    const data = []
    klines.forEach(n => {
      const [date, open, close, highest, lowest, volumne, amount, volatility, percentage_change, price_change, turnover_rate] = n.split(',')
      data.push(`('${date}', '${stockCode}', ${open}, ${close}, ${highest}, ${lowest}, ${volumne}, ${amount}, ${volatility}, ${percentage_change}, ${price_change}, ${turnover_rate})`)
      // data.push(`('${date}', ${open}, ${close}, ${highest}, ${lowest}, ${volumne}, ${amount}, ${volatility}, ${percentage_change}, ${price_change}, ${turnover_rate})`)
    })
    // console.log(data)
    return data
  } else {
    return []
  }




  // console.log(dayjs().format("YYYY-MM-DD HH:mm:ss") + "\n" + klines[klinesCount - 1])
  // await appendFile(
  //   "./cache/stock-data/" + stockCode + "-vvvv.json",
  //   dayjs().format("YYYY-MM-DD HH:mm:ss") + "\n" + klines[klinesCount - 1] + "\n"
  // ); // 调用函数

  //   .then((res) => {
  //     console.log("res", res.data.slice(0,100));
  //   })
  //   .catch((err) => {
  //     console.log("error", err);
  //   });

  // await new Promise((resolve) =>
  //   setTimeout(resolve, 1000)
  // );
};

// const run = async () => {
//   console.time("runTime");
//   await getOne({ code: '601988' });
//   setInterval(async () => {
//     await getOne({ code: '601988' });
//   }, 5000)

//   console.timeEnd("runTime");
// };

// run();

export default getData