<script setup>
import { ref, onMounted } from 'vue'
import request from '../../utils/request.js'

const tableData = ref([])

onMounted(async () => {
  const res = await request.get('/stock/list')

  tableData.value = res
})
</script>

<template>
  <div>
    <div>股票列表</div>
    <div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="code" label="代码" width="180" />
        <el-table-column prop="name" label="名称" />
      </el-table>
    </div>
  </div>
</template>
