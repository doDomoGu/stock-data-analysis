<script setup>
defineProps({
  attrs: Object,
  render: Function,
  link: Object,
})
</script>

<template>
  <el-table-column v-bind="{ ...attrs }">
    <template #default="{ row, column }">
      <template v-if="render">
        <div v-html="render(row, column)"></div>
      </template>
      <template v-if="link">
        <el-link type="primary">
          <router-link :to="{ name: link.routerName, params: link.getParams(row) }">{{
            link.getText(row)
          }}</router-link>
        </el-link>
      </template>
    </template>
  </el-table-column>
</template>
