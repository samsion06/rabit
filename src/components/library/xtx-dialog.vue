<!--对话框-->
<template>
  <div class="mask" v-if="dialogVisible==true">
    <div class="dialog">
      <div class="title">
        <slot name="Title"></slot>
      </div>
      <div class="content">
        <slot name="Content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import { watch } from 'vue'
  export default {
    name: 'Dialog',
    props: {
      dialogVisible: Boolean
    },
    setup(props) {
      watch(() => props.dialogVisible, () => {
        console.log("prp[s]", props);
      }, { immediate: true })
    }
  }
</script>

<style lang="less" scoped>
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    //background-color: rebeccapurple;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog {
    width: 600px;
    height: 400px;
    background-color: #ffffff;

    .title {
      height: 100px;
      border-bottom: 1px solid #ddd;
      line-height: 100px;
      margin-left: 20px;
      font-size: 20px;
    }

    //特破子组件全局居中
    // position: fixed;
    // left: 50%;
    // transform: translateX(-50%);
  }
</style>
