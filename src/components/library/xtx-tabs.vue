<template>
  <div>
    <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="User" name="first">User</el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
      <el-tab-pane label="Role" name="third">Role</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { ref } from 'vue'
  export default {
    name: 'Xtx-tabs',
    setup() {
      const activeName = ref('all')
      const clickTab = (name) => {
        console.log(name)
      }
      return { activeName, clickTab }
    }
  }
</script>

<style lang="less" scoped>
  .demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
 .el-tabs__nav .is-top {
    line-height: 59px;
  }

</style>
