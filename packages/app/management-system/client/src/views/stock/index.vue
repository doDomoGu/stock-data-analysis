<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import request from '@/utils/request.js'

const route = useRoute()

// info
const info = ref({})
onMounted(async () => {
  const res = await request.get('/stock/info', {
    params: {
      code: route.params.code,
    },
  })
  info.value = res
})

// tableData
const tableData = ref([])
const tableTotal = ref(0)
onMounted(async () => {
  const res = await request.get('/stock/data', {
    params: {
      code: route.params.code,
    },
  })
  tableData.value = res.list.map((n) => ({
    ...n,
    date: dayjs(n.date).format('YYYY-MM-DD'),
    open: parseFloat(n.open).toFixed(2),
    close: parseFloat(n.close).toFixed(2),
    highest: parseFloat(n.highest).toFixed(2),
    lowest: parseFloat(n.lowest).toFixed(2),
  }))

  tableTotal.value = res.total
})

const handlePaginationChange = async (currentPage, pageSize) => {
  const res = await request.get('/stock/data', {
    params: {
      code: route.params.code,
      page_num: currentPage,
      page_size: pageSize,
    },
  })
  tableData.value = res.list.map((n) => ({
    ...n,
    date: dayjs(n.date).format('YYYY-MM-DD'),
    open: parseFloat(n.open).toFixed(2),
    close: parseFloat(n.close).toFixed(2),
    highest: parseFloat(n.highest).toFixed(2),
    lowest: parseFloat(n.lowest).toFixed(2),
  }))
}
</script>

<template>
  <div>
    <div class="my-2 flex items-center">
      <div class="text-sm mr-8">
        <router-link to="/">&lt;返回</router-link>
      </div>
      <div class="text-xl mr-1">
        {{ info.name }}
      </div>
      <div class="text-lg mr-1">
        {{ info.code }}
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" />
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="open" label="开盘价" />
        <el-table-column prop="close" label="收盘价" />
        <el-table-column prop="highest" label="最高价" />
        <el-table-column prop="lowest" label="最低价" />
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
