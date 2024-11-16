<script setup>
import { ref, onMounted, reactive } from 'vue'
import request from '@/utils/request.js'

const queryParams = reactive({
  page_num: 1,
  page_size: 20,
  sort_name: 'percentage_change',
  sort_type: 'DESC',
  filter_abnormal: true,
})

const tableData = ref([])
const tableTotal = ref(0)

onMounted(async () => {
  const res = await request.get('/stock/list', {
    params: queryParams,
  })

  tableData.value = res.list
  tableTotal.value = res.total
})

const handlePaginationChange = async (currentPage, pageSize) => {
  queryParams.page_num = currentPage
  queryParams.page_size = pageSize

  const res = await request.get('/stock/list', {
    params: queryParams,
  })
  tableData.value = res.list
}

const handleSortChange = async ({ prop, order }) => {
  queryParams.sort_name = prop
  queryParams.sort_type = order == 'ascending' ? 'ASC' : 'DESC'
  const res = await request.get('/stock/list', {
    params: queryParams,
    // params: {
    //   // page_num: currentPage,
    //   // page_size: pageSize,
    //   sort_name: prop,
    //   sort_type: order == 'ascending' ? 'ASC' : 'DESC',
    // },
  })
  tableData.value = res.list
}

const fixed2Formatter = (row, col) => {
  return parseFloat(row[col.property]).toFixed(2)
}

const amountFormatter = (row) => {
  return parseFloat(row.amount / 10000 / 10000).toFixed(2) + '亿'
}
</script>

<template>
  <div>
    <div>股票列表</div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @sort-change="handleSortChange"
        :default-sort="{
          prop: queryParams.sort_name,
          order: queryParams.sort_type == 'DESC' ? 'descending' : 'ascending',
        }"
      >
        <el-table-column type="index" />
        <el-table-column prop="code" label="代码" width="100" sortable="custom" />
        <el-table-column prop="name" label="名称" />
        <el-table-column
          prop="cur_price"
          label="最新价"
          sortable="custom"
          align="right"
          :formatter="fixed2Formatter"
          :class-name="'font-[Monaco]'"
        />
        <el-table-column
          prop="percentage_change"
          label="涨跌幅(%)"
          sortable="custom"
          align="right"
          :formatter="fixed2Formatter"
          :class-name="'font-[Monaco]'"
        />
        <el-table-column prop="price_change" label="涨跌额" />
        <el-table-column prop="today_open" label="今开" />
        <el-table-column prop="yesterday_close" label="昨收" />
        <el-table-column prop="highest" label="最高价" />
        <el-table-column prop="lowest" label="最低价" />
        <el-table-column prop="volume" label="成交量(手)VOL" />
        <el-table-column prop="amount" label="成交额" :formatter="amountFormatter" />
        <el-table-column prop="volatility" label="振幅(%)" />
        <el-table-column prop="turnover_rate" label="换手率(%)" />
        <el-table-column prop="per" label="市盈率" />
        <el-table-column prop="qrr" label="量比" />
      </el-table>
    </div>
    <div class="mt-2 flex">
      <div class="flex-1"></div>
      <div class="flex-none">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tableTotal"
          :page-size="20"
          @change="handlePaginationChange"
        />
      </div>
    </div>
  </div>
</template>
