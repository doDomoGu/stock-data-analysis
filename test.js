import axios from "axios";

let url = "https://push2his.eastmoney.com/api/qt/stock/kline/get";

let params = {
  cb: "jQuery35109876909032935408_1730805894931",
  secid: "0.300339",
  ut: "fa5fd1943c7b386f172d6893dbfba10b",
  fields1: "f1,f2,f3,f4,f5,f6",
  fields2: "f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61",
  klt: "101",
  fqt: "1",
  end: "20500101",
  lmt: 120,
  _: "1730805894945",
};

axios
  .get(url, {
    params,
  })
  .then((res) => {
    console.log("res", res.data);
  })
  .catch((err) => {
    console.log("error", err);
  });
