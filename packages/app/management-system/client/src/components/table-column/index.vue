<script setup>
defineProps({
  attrs: Object,
  render: Function,
})

// console.log('props.render', props.render, props.render ? '111' : '222')
// props.render && props.render()
</script>

<template>
  <el-table-column v-bind="{ ...attrs }">
    <template v-if="render" #default="{ row, column }">
      <div v-html="render(row, column)"></div>
    </template>
  </el-table-column>
</template>
