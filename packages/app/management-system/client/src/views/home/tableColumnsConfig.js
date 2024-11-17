import { fixed2Formatter, amountFormatter, volFormatter } from "@/utils/tableFormatter"

const numberMix = (cfgItem) => ({
  align: "right",
  formatter: fixed2Formatter,
  className: 'font-[Monaco]',
  sortable: "custom",
  ...cfgItem
})

const config = [
  {
    type: 'index'
  },
  {
    prop: 'code',
    label: '代码',
    sortable: 'custom'
  },
  {
    prop: 'name',
    label: '名称',
  },
  numberMix({
    prop: "cur_price",
    label: "最新价",

  }),
  numberMix({
    prop: "percentage_change",
    label: "涨跌幅(%)",
    minWidth: 100
  }),
  numberMix({
    prop: "price_change",
    label: "涨跌额",
  }),
  numberMix({
    prop: "today_open",
    label: "今开",
  }),
  numberMix({
    prop: "yesterday_close",
    label: "昨收",
  }),
  numberMix({
    prop: "highest",
    label: "最高价",
  }),
  numberMix({
    prop: "lowest",
    label: "最低价",
  }),
  numberMix({
    prop: "volume",
    label: "成交量(手)VOL",
    minWidth: 120,
    formatter: volFormatter
  }),
  numberMix({
    prop: "amount",
    label: "成交额",
    formatter: amountFormatter
  }),
  numberMix({
    prop: "volatility",
    label: "振幅(%)",
  }),
  numberMix({
    prop: "turnover_rate",
    label: "换手率(%)",
    minWidth: 100
  }),
  numberMix({
    prop: "per",
    label: "市盈率",
  }),
  numberMix({
    prop: "qrr",
    label: "量比",
  }),

]


export default config