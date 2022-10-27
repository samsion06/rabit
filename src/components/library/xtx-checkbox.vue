<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default">
      <slot />
    </span>
  </div>
</template>

<script>
  import { ref, watch } from 'vue'
  export default {
    name: 'XtxCheckbox',
    props: {
      modelValue: {
        type: Boolean
      }
    },
    setup(props, { emit }) {
      const checked = ref(null)
      console.log("props", props.modelValue);

      function changeChecked() {
        checked.value = !checked.value
        //console.log("checked.value", checked.value);
        //这是双向绑定
        //emit('update:modelValue', checked.value) //update:porps接受的属性名称
        //这是纯通知父组件
        emit('update:modelValue', checked.value)
        emit('change',checked.value)
      }

      watch(() => props.modelValue, (newval) => {
        checked.value = newval
      }, { immediate: true })

      return {
        checked,
        changeChecked
      }
    }
  }
</script>

<style scoped lang="less">
  .xtx-checkbox {
    display: inline-block;
    margin-right: 2px;

    .icon-checked {
      color: @xtxColor;

      ~span {
        color: @xtxColor;
      }
    }

    i {
      position: relative;
      top: 1px;
    }

    span {
      margin-left: 2px;
    }
  }
</style>
