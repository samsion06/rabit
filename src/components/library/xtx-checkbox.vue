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

      function changeChecked() {
        checked.value = !checked.value
        emit('update:modelValue', checked.value)
        //emit('update:change', checked.value)
      }

      watch(props.modelValue, (newval) => {
        checked.value = props.modelValue
      })

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
