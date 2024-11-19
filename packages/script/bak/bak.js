import dayjs from "dayjs";
import fs from "fs";

const startTime = process.hrtime();

// process.argv 是一个数组，包含了命令行输入的参数
const args = process.argv.slice(2); // 去掉数组中的前两个元素（'node' 和脚本路径）

// STOCK_CODE: 股票代码
const STOCK_CODE = args[0];

// MA_NUM: "N"日移动平均线(以','分割多个)
const MA_NUM = args[1].split(",").map((n) => parseInt(n));

// DATE: 查看哪一天的  缺省为当日
const DATE = dayjs(args[2]).format("YYYY-MM-DD");

console.log("股票代码:", STOCK_CODE);
console.log("N日移动平均线(多个):", MA_NUM);
console.log("查询日期:", DATE);

fs.readFile("data/" + STOCK_CODE + ".json", "utf8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    var jsonData = JSON.parse(data);

    const lastIdx = jsonData.findIndex((item) => item.indexOf(DATE) == 0);

    if (lastIdx) {
      MA_NUM.forEach((maNum) => {
        // console.log('maNum', maNum)
        let sum = 0;
        for (let i = 0; i < maNum; i++) {
          let item = jsonData[lastIdx - i];
          let d = parseFloat(item.split(",")[2]);
          sum += d;
        }
        // console.log('sum', sum)
        let res = parseFloat(sum / maNum).toFixed(2);
        console.log("MA", maNum, ": ", res);
      });
    }

    const endTime = process.hrtime(startTime);
    const durationInSeconds = (endTime[0] + endTime[1] / 1e9).toFixed(3);
    console.log(`Duration: ${durationInSeconds} seconds`);
  }
});
