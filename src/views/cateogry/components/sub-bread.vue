<template>
  
  <!-- 面包屑 -->
  <el-breadcrumb separator=">" class="bread">
    <el-breadcrumb-item>
      <router-link to="/">
        首页
      </router-link>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="category.top" :to="`/category/${category.top.id}`">
      {{category.top.name}}
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="category.sub">
      {{category.sub.name}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  export default {
    name: 'SubBread',
    setup() {
      const route = useRoute()
      const store = useStore()
      console.log(store)
      // 3. 通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
      const category = computed(() => {
        const obj = {}
        store.state.category.list.forEach(top => { //一级
          top.children && top.children.forEach(sub => { //二级
            //列表粒找目前路由地址的id
            if (sub.id === route.params.id) {
              // 设置二级类目
              obj.sub = { id: sub.id, name: sub.name }
              // 设置一级类目
              obj.top = { id: top.id, name: top.name }
            }
          })
        })
        return obj
      })
      return { category }
    }
  }
</script>
<style scoped lang="less"></style>
