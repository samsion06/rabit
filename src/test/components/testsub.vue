<template>
  <div>123</div>
  <div>xx{{goods}}</div>



</template>

<script setup>
  import { onMounted } from 'vue'
  console.log("init");
  const props = defineProps({
    goods: Array,
  })
  onMounted(() => {
    console.log("onMounted");
  })
</script>

<style>
</style>
