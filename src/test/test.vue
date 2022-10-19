<template>
  <div @click="show=true">xxx:点击</div>
  <div @click="change">父组件点击</div>
  <testSub v-if="goods.length>0" :goods="goods" />
</template>

<script setup>
  import { ref, reactive, computed, nextTick } from 'vue'
  import testSub from './components/testsub.vue'
  const show = ref(false)
  const goods = ref([])
  //插值表达式是可以渲染 null 和undefined
  // 但是不能渲染点后面的
  // 123.goods  报错
  // ‘123’|| [] || {} || false.goods => undefined
  // 123 || undefined || null .goods => 报错
  function change() {
    goods.value = []
    nextTick(() => {
      //等v-if组件销毁以后，在重新符合v-if条件就能重新渲染组件就能重新初始化组件
      goods.value.push('123')
    })
  }
</script>



<style>
</style>
