import request from "../utils/request.js";
import dayjs from 'dayjs'
import { append as appendFile } from "../utils/file.js";

const getInfo = async (stockCode) => {
  let url = "https://push2.eastmoney.com/api/qt/stock/get";

  let params = {
    // ut: "fa5fd1943c7b386f172d6893dbfba10b",
    invt: '2',
    fltt: '1',
    fields: "f43,f57,f58,f107,f162,f152,f167,f92,f59,f183,f184,f105,f185,f186,f187,f173,f188,f84,f116,f85,f117,f190,f189,f62,f55",
    // secid: "1.600000",
    wbp2u: '|0|0|0|web',
    dect: '1',
    // _: "1731382400934",
    // cb: 'jQuery351042550699312112616_1731382400933'
  };

  const res = await request.get(url, {
    params: {
      ...params,
      secid: `${(stockCode[0] == "6" ? "1" : "0")}.${stockCode}`,
      fields: [
        'f43', // 最新价
        'f58', // 名称
        'f189', // 上市日期
        'f288', // 0 正常 -1 退市
      ].join(',')
    },
  });

  // console.log({ res })
  // const s = {
  //   f43: 9.69,  // 最新价
  //   f44: 9.82,  // 最高价
  //   f45: 9.66,  // 最低价
  //   f46: 9.73,  // 今开
  //   f47: 355939, // 成交量(手)
  //   f48: 346930109.0, // 成交额(万)
  //   f50: 0.77, // 量比
  //   f57: "600000",
  //   f58: "浦发银行",
  //   f59: 2,
  //   f60: 9.72, // 昨收
  //   f107: 1,
  //   f152: 2,
  //   f162: 6.06, // 市盈率
  //   f168: 0.12,  // 换手率(%)
  //   f169: -0.03, // 涨跌额
  //   f170: -0.31, // 涨跌幅(%)
  //   f171: 1.65, // 振幅(%)
  //   f292: 2
  //   f55: 1.20001318, // 收益(当前季度)
  //   f57: '600000',
  //   f59: 2,
  //   f62: 3,
  //   f84: 29352177607, // 总股本
  //   f85: 29352177607, // 流通股(本)
  //   f92: 21.8043788, // 每股净资产
  //   f105: 35223000000, // 净利润
  //   f107: 1,
  //   f116: 284716122787.89996, // 总值
  //   f117: 284716122787.89996, // 流(通)值
  //   f152: 2,
  //   f162: 606, // PE(动)  市盈率
  //   f167: 44, // 市净率 (%)
  //   f173: 5.25, // ROE
  //   f183: 129839000000, // 总营收
  //   f184: -2.2407107631, // 同比(总营收)
  //   f185: 25.859358250554, // 同比(净利润)
  //   f186: 0, // 毛利率
  //   f187: 27.485578293099998,  // 净利率
  //   f188: 92.2370489782, // 负债率
  //   f189: 19991110,
  //   f190: 7.619366542217 // 每股未分配利润
  // }
  await appendFile("./cache/stock-info/log_" + (Date.parse(new Date()) / 1000) + ".json",
    stockCode + '| ' + JSON.stringify(res.data) + "\n"
  )
  if (res.data == null) {
    return false
  }
  // console.log(res.data)
  const info = {
    code: stockCode,
    name: res.data.f58,
    open_date: res.data.f189 == '-' ? null : dayjs(String(res.data.f189)).format('YYYY-MM-DD'),
    cur_price: res.data.f288 == 0 ? (parseFloat(res.data.f43) / 100).toFixed(2) : null,
    is_open: res.data.f189 == '-' ? 1 : res.data.f288  // 上市日期:'-' 表示"未上市"
  }

  return info
}

export default getInfo