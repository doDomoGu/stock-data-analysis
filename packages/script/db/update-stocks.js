import connection from "../utils/db.js";

const updateStocks = async (values) => {
  try {
    await connection.execute(`CREATE TABLE IF NOT EXISTS \`stocks\` (
      \`code\` varchar(20) NOT NULL,
      \`name\` varchar(45) NOT NULL,
      \`open_date\` varchar(50) DEFAULT NULL COMMENT '上市日期',
      \`is_open\` tinyint(1) DEFAULT NULL COMMENT '0 正常 -1 退市 1 未上市',
      \`cur_price\` float DEFAULT NULL COMMENT '最新价',
      \`today_open\` float DEFAULT NULL COMMENT '今开',
      \`yesterday_close\` float DEFAULT NULL COMMENT '昨收',
      \`percentage_change\` float DEFAULT NULL COMMENT '涨跌幅(%)',
      \`price_change\` float DEFAULT NULL COMMENT '涨跌额',
      \`volume\` int DEFAULT NULL COMMENT '成交量(手) VOL',
      \`amount\` double DEFAULT NULL COMMENT '成交额',
      \`volatility\` float DEFAULT NULL COMMENT '振幅(%)',
      \`turnover_rate\` float DEFAULT NULL COMMENT '换手率(%)',
      \`per\` float DEFAULT NULL COMMENT '市盈率',
      \`qrr\` float DEFAULT NULL COMMENT '量比',
      \`highest\` float DEFAULT NULL COMMENT '最高价',
      \`lowest\` float DEFAULT NULL COMMENT '最低价',
      \`total_market_value\` double DEFAULT NULL COMMENT '总市值',
      \`circulating_market_value\` double DEFAULT NULL COMMENT '流通市值',
      \`growth_rate\` float DEFAULT NULL COMMENT '涨速(%)',
      \`pbr\` float DEFAULT NULL COMMENT '市净率',
      \`60_days_percentage_change\` float DEFAULT NULL COMMENT '60日涨跌幅',
      \`this_year_percentage_change\` float DEFAULT NULL COMMENT '年初至今涨跌幅',
      PRIMARY KEY (\`code\`)
    );`);

    const queryStr =
      "replace into `stocks` (" +
      "code" +
      ",name" +
      ",cur_price" +
      ",today_open" +
      ",yesterday_close" +
      ",percentage_change" +
      ",price_change" +
      ",volume" +
      ",amount" +
      ",volatility" +
      ",turnover_rate" +
      ",per" +
      ",qrr" +
      ",highest" +
      ",lowest" +
      ",total_market_value" +
      ",circulating_market_value" +
      ",growth_rate" +
      ",pbr" +
      ",60_days_percentage_change" +
      ",this_year_percentage_change" +
      ") values " +
      values
        .join(",");
    // console.log("queryStr: ", queryStr);

    await connection.execute(queryStr);

  } catch (err) {
    console.log(err);
  }
}

export default updateStocks
