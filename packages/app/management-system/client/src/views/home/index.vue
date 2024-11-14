<script setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/request.js'

const tableData = ref([])
const tableTotal = ref(0)

onMounted(async () => {
  const res = await request.get('/stock/list')

  tableData.value = res.list
  tableTotal.value = res.total
})

const handlePaginationChange = async (currentPage, pageSize) => {
  const res = await request.get('/stock/list', {
    params: {
      page_num: currentPage,
      page_size: pageSize,
    },
  })
  tableData.value = res.list
}
</script>

<template>
  <div>
    <div>股票列表</div>
    <div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" />
        <el-table-column prop="code" label="代码" width="100" />
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="cur_price" label="最新价" />
        <el-table-column prop="percentage_change" label="涨跌幅(%)" />
        <el-table-column prop="price_change" label="涨跌额" />
        <el-table-column prop="today_open" label="今开" />
        <el-table-column prop="yesterday_close" label="昨收" />
        <el-table-column prop="highest" label="最高价" />
        <el-table-column prop="lowest" label="最低价" />
        <el-table-column prop="volume" label="成交量(手)VOL" />
        <el-table-column prop="amount" label="成交额" />
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
