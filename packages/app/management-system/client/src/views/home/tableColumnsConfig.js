import { fixed2Formatter, amountFormatter, volFormatter, fixed2PercentFormatter, upDownFormatter, chainsFormatter, upDownCellClass } from "@/utils/tableFunctions"


const numFixed2 = (v) => parseFloat(v).toFixed(2)
const numFixed2Percent = v => numFixed2(v) + '%'

const numberMix = (cfgItem) => ({
  align: "right",
  className: 'font-[Monaco]',
  sortable: "custom",
  minWidth: 100,
  ...cfgItem
})

const renderComparison = (val, comparisonVal, formatter) => {
  let className = ''
  switch (true) {
    case val > comparisonVal:
      className = 'text-red-600'
      break;
    case val < comparisonVal:
      className = 'text-green-600'
      break;
    case val == comparisonVal:
      className = 'text-gray-950'
      break;

  }
  return `<span class="${className}">${formatter(val)}</span>`
}

const config = [
  {
    attrs: {
      type: 'index'
    }
  },
  {
    attrs: {
      prop: 'code',
      label: '代码',
      sortable: 'custom'
    }
  },
  {
    attrs: {
      prop: 'name',
      label: '名称',
    }
  },
  {
    attrs: numberMix({
      prop: "cur_price",
      label: "最新价",
    }),
    render: (row) => renderComparison(row.cur_price, row.yesterday_close, numFixed2)
  },
  {
    attrs: numberMix({
      prop: "percentage_change",
      label: "涨跌幅",
    }),
    render: (row) => renderComparison(row.percentage_change, 0, numFixed2Percent)
  },
  {
    attrs: numberMix({
      prop: "price_change",
      label: "涨跌额",
    }),
    render: (row) => renderComparison(row.price_change, 0, numFixed2)
  },
  {
    attrs: numberMix({
      prop: "volume",
      label: "成交量(手)",
      formatter: volFormatter
    })
  },
  {
    attrs: numberMix({
      prop: "amount",
      label: "成交额",
      formatter: amountFormatter
    })
  },
  {
    attrs: numberMix({
      prop: "volatility",
      label: "振幅",
      formatter: fixed2PercentFormatter
    })
  },
  {
    attrs: numberMix({
      prop: "highest",
      label: "最高价",
    }),
    render: (row) => renderComparison(row.highest, row.yesterday_close, numFixed2)
  },
  {
    attrs: numberMix({
      prop: "lowest",
      label: "最低价",
    }),
    render: (row) => renderComparison(row.lowest, row.yesterday_close, numFixed2)
  },
  {
    attrs: numberMix({
      prop: "today_open",
      label: "今开",
    }),
    render: (row) => renderComparison(row.today_open, row.yesterday_close, numFixed2)
  },
  {
    attrs: numberMix({
      prop: "yesterday_close",
      label: "昨收",
      formatter: fixed2Formatter
    }),
  },
  {
    attrs: numberMix({
      prop: "qrr",
      label: "量比",
      formatter: fixed2Formatter
    }),
  },
  {
    attrs: numberMix({
      prop: "turnover_rate",
      label: "换手率",
      formatter: fixed2PercentFormatter
    }),
  },
  {
    attrs: numberMix({
      prop: "per",
      label: "市盈率",
      formatter: fixed2Formatter
    }),
  }
]


export default config