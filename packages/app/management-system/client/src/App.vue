<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <el-config-provider :font-family="'Arial'">
    <RouterView />
  </el-config-provider>
</template>
