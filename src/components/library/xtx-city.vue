<!--地址弹窗-->
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{active}">
      <span class="placeholder">{{fullLocation}}</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code" @click="selectArea(item)">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onMounted, reactive } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import axios from 'axios'
  //存储选择的省市区信息
  const location = reactive({
    provinceCode: '',
    provinceName: '',
    cityCode: '',
    cityName: '',
    countyCode: '',
    countyName: '',
    fullLocation: ''
  })
  const active = ref(false) //对话框状态
  const loading = ref(false) //加载状态
  const cityData = ref([]) //城市数据（）三方）
  //先初始化setUp外面的script,再初始化setup里面的数据
  export default {
    name: 'XtxCity',
    props: {
      fullLocation: String
    },
    setup(props, { emit }) {
      //打开/关闭 城市选择框
      function toggleDialog() {
        active.value = !active.value
        // 每次打开清空已选的缓存
        for (const key in location) {
          location[key] = ''
        }
        if (active.value) {
          getCityData().then(data => {
            cityData.value = data
            loading.value = false
            console.log("拉去城市列表数据", data);
          })
        } else {
          //关闭城市选择框
          console.log();
        }
      }
      //点击其他位置/隐藏城市选择框
      const target = ref(null)
      onClickOutside(target, () => {
        active.value = false
      })

      //缓存三方城市数据？
      const currList = computed(() => {
        //省份
        let currList = cityData.value
        //市
        if (location.provinceCode) {
          currList = cityData.value.find(p => p.code == location.provinceCode).areaList
        }
        //区
        if (location.cityCode) {
          currList = currList.find(c => c.code == location.cityCode).areaList
        }
        if (location.countyCode) {
          location.fullLocation = `${location.provinceName} ${location.cityName} ${location.countyName}`
          active.value = false
          //将完整地址信息回传给父组件
          emit('change', location)
        }
        return currList
      })

      //获取城市数据
      function getCityData() {
        // 这个位置可能有异常操作，封装成promise
        return new Promise((resolve, reject) => {
          if (window.cityData) {
            // 有缓存
            resolve(window.cityData)
          } else {
            // 无缓存
            const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
            axios.get(url).then(res => {
              window.cityData = res.data
              resolve(window.cityData)
            })
          }
        })
      }

      //选择省、市、区
      function selectArea(item) {
        // 省份
        if (item.level === 0) {
          location.provinceCode = item.code
          location.provinceName = item.name
        }
        // 市
        if (item.level === 1) {
          location.cityCode = item.code
          location.cityName = item.name
        }
        //
        if (item.level === 2) {
          location.countyCode = item.code
          location.countyName = item.name
        }
      }

      return {
        active,
        loading,
        target, //判断是否点击了城市列表外面的地方
        currList, //存储三方城市数据
        //方法
        toggleDialog,
        selectArea,
      }
    }
  }
</script>
<style scoped lang="less">
  .xtx-city {
    display: inline-block;
    position: relative;
    z-index: 400;

    .select {
      border: 1px solid #e4e4e4;
      height: 30px;
      padding: 0 5px;
      line-height: 28px;
      cursor: pointer;

      &.active {
        background: #fff;
      }

      .placeholder {
        color: #999;
      }

      .value {
        color: #666;
        font-size: 12px;
      }

      i {
        font-size: 12px;
        margin-left: 5px;
      }
    }

    .option {
      width: 542px;
      border: 1px solid #e4e4e4;
      position: absolute;
      left: 0;
      top: 29px;
      background: #fff;
      min-height: 30px;
      line-height: 30px;
      display: flex;
      flex-wrap: wrap;
      padding: 10px;

      // 省略...
      .loading {
        height: 290px;
        width: 100%;
        background: url(../../assets/images/loading.gif) no-repeat center;
      }

      >span {
        width: 130px;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        padding: 0 3px;

        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }
</style>
