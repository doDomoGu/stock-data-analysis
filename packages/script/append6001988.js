import request from "./utils/request.js";
import dayjs from 'dayjs'

import { append as appendFile } from "./utils/file.js";

let url = "https://push2his.eastmoney.com/api/qt/stock/kline/get";

let params = {
  // cb: "jQuery35109876909032935408_1730805894931",
  //   secid: "0.300339",
  ut: "fa5fd1943c7b386f172d6893dbfba10b",
  fields1: "f1,f2,f3,f4,f5,f6",
  fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61",
  klt: "101",
  fqt: "1",
  end: "20500101",
  lmt: 120,
  _: "1730805894945",
};

const getOne = async (stockItem) => {
  console.log("stockItem", stockItem);
  const res = await request.get(url, {
    params: {
      ...params,
      secid: (stockItem.code[0] == "6" ? "1" : "0") + "." + stockItem.code,
      lmt: 10,
    },
  });
  // console.log(res);
  //   const res =
  // 'jQuery35109876909032935408_1730805894931({"rc":0,"rt":17,"svr":177617940,"lt":1,"full":0,"dlmkts":"","data":{"code":"688622","market":1,"name":"禾信仪器"}});';
  // const matchedString = res.match(/.*klines\":(\[.*\])\}\}/)[1];
  // const resArr = JSON.parse(matchedString)
  const klines = res.data.klines
  const klinesCount = klines.length
  console.log("klines count: ", klinesCount);
  // console.log("res", matchedString.substring(0, 200));
  console.log(dayjs().format("YYYY-MM-DD HH:mm:ss") + "\n" + klines[klinesCount - 1])
  await appendFile(
    "./cache/stock-data-2/" + stockItem.code + "-vvvv.json",
    dayjs().format("YYYY-MM-DD HH:mm:ss") + "\n" + klines[klinesCount - 1] + "\n"
  ); // 调用函数

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

const run = async () => {
  console.time("runTime");
  await getOne({ code: '601988' });
  setInterval(async () => {
    await getOne({ code: '601988' });
  }, 5000)

  console.timeEnd("runTime");
};

run();
