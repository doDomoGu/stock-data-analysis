export const fixed2Formatter = (row, col) => {
  return parseFloat(row[col.property]).toFixed(2)
}

// 成交量(手)
export const volFormatter = (row) => {
  return parseFloat(row.volume / 10000).toFixed(2) + '万'
}
// 成交额
export const amountFormatter = (row) => {
  return parseFloat(row.amount / 10000 / 10000).toFixed(2) + '亿'
}
