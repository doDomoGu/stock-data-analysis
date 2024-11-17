<script setup>
import { ref, onMounted, reactive } from 'vue'
import request from '@/utils/request'
import TableColumn from '@/components/table-column'
import tableColumnsConfig from './tableColumnsConfig'

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
  })
  tableData.value = res.list
}
</script>

<template>
  <div class="p-2">
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
        <TableColumn v-for="item in tableColumnsConfig" :key="item" v-bind="{ ...item }" />
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
