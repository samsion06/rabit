<template>
  <div>xxx:{{num}}</div>
  <div>
    <div v-for="(item,index) in list" :key="index">
      <div>{{list}}</div>
      <div>{{item.name}}</div>
    </div>
  </div>

</template>

<script setup>
  import { ref, reactive, computed } from 'vue'
  //const list = ref([])
  const arr = ref([])
  let list = computed(() => {
    console.log(123);
    var res
    setTimeout(() => {
      res = arr.value.find(item => item.id == 2)
      console.log(res);
    }, 5000)
    return arr
  })

  console.log(list);

  //插值表达式是可以渲染 null 和undefined
  // 但是不能渲染点后面的
  // 123.goods  报错
  // ‘123’|| [] || {} || false.goods => undefined
  // 123 || undefined || null .goods => 报错
</script>



<style>
</style>
