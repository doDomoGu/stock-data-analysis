export const fixed2Formatter = (row, col) => {
  if (row[col.property] == null)
    return '--'
  return parseFloat(row[col.property]).toFixed(2)
}

export const fixed2PercentFormatter = (row, col) => {
  if (row[col.property] == null)
    return '--'
  return parseFloat(row[col.property]).toFixed(2) + '%'
}

// export const upDownFormatter = (row, col, before) => {
//   let result
//   switch (true) {
//     case before > 0:
//       result = `<span class="text-green-600">${before}</span>`;
//       break;
//     case before < 0:
//       result = `<span class="text-red-600">${before}</span>`
//       break;
//     case before == 0:
//       result = `<span class="text-gray-950">${before}</span>`
//       break;
//     default: `${before}`
//   }

//   return result
// }

// export const chainsFormatter = (row, col, formatters) => {
//   let result
//   for (let formatter of formatters) {
//     result = formatter(row, col, result)
//   }
//   return result
// }

// export const upDownCellClass = (row, col) => {
//   const val = row[col.property]
//   console.log({ val })
//   let result = ''
//   switch (true) {
//     case val > 0:
//       result = "text-green-600"
//       break;
//     case val < 0:
//       result = "text-red-600"
//       break;
//     case val == 0:
//       result = "text-gray-950"
//       break;
//   }

//   return result
// }

// 成交量(手)
export const volFormatter = (row) => {
  return parseFloat(row.volume / 10000).toFixed(2) + '万'
}
// 成交额
export const amountFormatter = (row) => {
  return parseFloat(row.amount / 10000 / 10000).toFixed(2) + '亿'
}
