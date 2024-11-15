<script setup>
import { RouterView } from 'vue-router'
import Header from './header'
</script>

<template>
  <div>
    <Header />
    <div class="px-4">
      <RouterView />
    </div>
  </div>
</template>
