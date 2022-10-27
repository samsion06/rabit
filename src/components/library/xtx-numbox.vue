<!--修改商品数量-->
<template>
  <div class="xtx-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="modelValue">
      <a href="javascript:;" @click="changeNum(+1)">+</a>
    </div>
  </div>
</template>
<script>
  import { watch, ref } from 'vue'
  export default {
    name: 'XtxNumbox',
    props: {
      label: {
        type: String
      },
      //显示数量
      modelValue: {
        type: Number,
        default: 1 //这里的default是多少也没用，都不是拿props渲染
      },
      min: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: 100
      }
    },
    setup(props, { emit }) {
      const num = ref(1) //页面数量渲染

      //为什么要用props 因为要获取父组件传过来的值，而且要修改，
      //因为props只能单项数据流，不能直接修改props.modelValue所以要声明一个reative嫁接，修改后回传给父组件
      watch(() => props.modelValue, (newModelValue) => {
        num.value = newModelValue
        console.log(" num.value", num.value);
        //console.log("newModelValue", newModelValue);
      }, { immediate: true })

      function changeNum(step) {
        //num.value+=step 这样num.value的值已经改变
        //洗面这种num.value没改变
        let NUM = num.value + step
        if (NUM < props.min) return
        if (NUM > props.max) return

        emit('update:modelValue', NUM)
        emit('change', NUM)
      }

      return {
        num,
        changeNum
      }
    }
  }
</script>
<style scoped lang="less">
  .xtx-numbox {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }

    .numbox {
      width: 120px;
      height: 30px;
      border: 1px solid #e4e4e4;
      display: flex;

      >a {
        width: 29px;
        line-height: 28px;
        text-align: center;
        background: #f8f8f8;
        font-size: 16px;
        color: #666;

        &:first-of-type {
          border-right: 1px solid #e4e4e4;
        }

        &:last-of-type {
          border-left: 1px solid #e4e4e4;
        }
      }

      >input {
        width: 60px;
        padding: 0 5px;
        text-align: center;
        color: #666;
      }
    }
  }
</style>
