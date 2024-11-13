


// pn=1&pz=6020&po=0&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&dect=1&
// wbp2u=|0|0|0|web
// fid=f12
// fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048

// fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152





import request from "../utils/request.js";
import dayjs from 'dayjs'
import { append as appendFile } from "../utils/file.js";

// const s = {
//   "f1": 2,
//   "f2": 11.61, // 最新价 cur_price
//   "f3": 0.61, // 涨跌幅(%) percentage_change
//   "f4": 0.07, // 涨跌额 price_change
//   "f5": 1086263, // 成交量(手) volume
//   "f6": 1260161857.32, // 成交额 amount
//   "f7": 1.91, // 振幅(%) volatility
//   "f8": 0.56, // 换手率(%) turnover_rate
//   "f9": 4.25, // 市盈率 per
//   "f10": 0.62, // 量比 qrr

//   "f11": 0.0,
//   "f12": "000001",
//   "f13": 0,
//   "f14": "平安银行",
//   "f15": 11.7, // 最高价 highest
//   "f16": 11.48, // 最低价 lowest
//   "f17": 11.5, // 今开 today_open
//   "f18": 11.54, // 昨收 yesterday_close
//   "f20": 225302710279, // 总市值 total_market_value
//   "f21": 225299219500, // 流通市值 circulating_market_value
//   "f22": 0.0, // 涨速(%) growth_rate
//   "f23": 0.54, // 市净率 pbr
//   "f24": 18.95, // 60日涨跌幅 60_days_percentage_change
//   "f25": 37.72, // 年初至今涨跌幅 this_year_percentage_change
//   "f62": 7308480.0,
//   "f115": 4.84,
//   "f128": "-",
//   "f140": "-",
//   "f141": "-",
//   "f136": "-",
//   "f152": 2,
//   "f189": "-"
// }

const getData = async () => {
  let url = "https://47.push2.eastmoney.com/api/qt/clist/get";

  let params = {
    pn: 1,
    pz: 6020, // 6020,
    po: 0,
    np: 1,
    fltt: 2,
    invt: 2,
    // fields: "f43,f57,f58,f107,f162,f152,f167,f92,f59,f183,f184,f105,f185,f186,f187,f173,f188,f84,f116,f85,f117,f190,f189,f62,f55",
    wbp2u: '|0|0|0|web',
    dect: '1',
    fid: 'f12',
    fs: 'm:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048'
  };

  const res = await request.get(url, {
    params: {
      ...params,
      fields: [
        "f2", // 最新价 cur_price
        "f3", // 涨跌幅(%) percentage_change
        "f4", // 涨跌额 price_change
        "f5", // 成交量(手) volume
        "f6", // 成交额 amount
        "f7", // 振幅(%) volatility
        "f8", // 换手率(%) turnover_rate
        "f9", // 市盈率 per
        "f10", // 量比 qrr
        "f12", // code
        "f14", // name
        "f15", // 最高价 highest
        "f16", // 最低价 lowest
        "f17", // 今开 today_open
        "f18", // 昨收 yesterday_close
        "f20", // 总市值 total_market_value
        "f21", // 流通市值 circulating_market_value
        "f22", // 涨速(%) growth_rate
        "f23", // 市净率 pbr
        "f24", // 60日涨跌幅 60_days_percentage_change
        "f25", // 年初至今涨跌幅 this_year_percentage_change
      ].join(',')
    },
  });


  const data = res.data.diff.filter(n => n.f2 != null)
    .map(n =>
      `(` +
      `'${n.f12}',` + // code
      `'${n.f14}',` + // name
      `'${n.f2}',` + // 最新价 cur_price
      `'${n.f17}',` + // 今开 today_open
      `'${n.f18}',` + // 昨收 yesterday_close
      `'${n.f3}',` + // 涨跌幅(%) percentage_change
      `'${n.f4}',` + // 涨跌额 price_change
      `'${n.f5}',` + // 成交量(手) volume
      `'${n.f6}',` + // 成交额 amount
      `'${n.f7}',` + // 振幅(%) volatility
      `'${n.f8}',` + // 换手率(%) turnover_rate
      `'${n.f9}',` + // 市盈率 per
      `'${n.f10}',` + // 量比 qrr
      `'${n.f15}',` + // 最高价 highest
      `'${n.f16}',` + // 最低价 lowest
      `'${n.f20}',` + // 总市值 total_market_value
      `'${n.f21}',` + // 流通市值 circulating_market_value
      `'${n.f22}',` + // 涨速(%) growth_rate
      `'${n.f23}',` + // 市净率 pbr
      `'${n.f24}',` + // 60日涨跌幅 60_days_percentage_change
      `'${n.f25}'` + // 年初至今涨跌幅 this_year_percentage_change
      `)`
    )

  await appendFile("./cache/stocks/log.json",
    (Date.parse(new Date()) / 1000) + '|' + data.join("\n") + "\n"
  )

  // const info = {
  //   code: stockCode,
  //   name: res.data.f58,
  //   open_date: res.data.f189 == '-' ? null : dayjs(String(res.data.f189)).format('YYYY-MM-DD'),
  //   cur_price: res.data.f288 == 0 && res.data.f43 != '-' ? (parseFloat(res.data.f43) / 100).toFixed(2) : null,
  //   is_open: res.data.f189 == '-' ? 1 : res.data.f288  // 上市日期:'-' 表示"未上市"
  // }

  // return info
  return data
}

export default getData