<!--规格部分-->
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected,disabled:val.disabled}" @click="clickSpecs(item,val)" v-if="val.picture"
            :src="val.picture" :title="val.name">
          <span :class="{selected:val.selected,disabled:val.disabled}" @click="clickSpecs(item,val)"
            v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
  import powerSet from '@/vender/power-set'
  const pathMap = {}
  //得到一个路径字典对象
  const getPathMap = (skus) => {
    //拿到所有库存大于0的规格
    skus.forEach(sku => {
      if (sku.inventory > 0) {
        //获取各个规格的子集
        // console.log("sku", sku);
        const valArr = sku.specs.map(val => val.valueName) //[ '驼色', 'XXL']
        //每个规格的子集
        const valArrPowerSet = powerSet(valArr) //[[],['驼色', 'L']]
        //console.log(valArrPowerSet);
        valArrPowerSet.forEach(arr => {
          const key = arr.join('*') //数组转字符串
          if (pathMap[key]) {
            pathMap[key].push(sku.id)
          } else {
            pathMap[key] = [sku.id]
          }
        })
      }
    })
    return pathMap
  }
  //获取选中的按钮
  const getSelectedValues = (specs) => {
    const arrSeleted = []
    specs.forEach(item => { //找到一行属性选中的按钮
      // console.log("item", item);
      const selectedVal = item.values.find(val => val.selected)
      arrSeleted.push(selectedVal ? selectedVal.name : undefined) //[xx,?,?]
    })
    return arrSeleted
  }

  //默认选中
  const initDefaultSelected = (goods, skuId) => {
    //找到对应的规格
    const sku = goods.skus.find(sku => sku.id == skuId)
    //再页面上点亮默认规格
    goods.specs.forEach((item, index) => { //item.values=》属性值组
      let btn = item.values.find(val => val.name == sku.specs[index].valueName)
      btn.selected = true
    })
  }
  //库存为0 productId:1369155859933827074
  // "name":"颜色",
  // "valueName":"黑色"
  // },
  // {
  // "name":"尺寸",
  // "valueName":"20cm"
  // },
  // {
  // "name":"产地",
  // "valueName":"日本"
  // }

  //更新按钮禁用状态 (选中样式一个，禁用一个)
  const updateDisabledStatus = (specs, pathMap) => {
    //specs => [{att_name,att_vals:[{attval1:‘黑‘，},{atval2:白}]]
    specs.forEach((item, index) => { //每行属性
      const selectedVal = getSelectedValues(specs) //拿到选中的按钮
      item.values.forEach(val => { //values属性值组，val属性值对象
        if (val.selected) {
          return
        } else {
          selectedVal[index] = val.name //[黑色，20，中国] [黑色，20，日本]
          //console.log("selectedVal", selectedVal);
        }
        const key = selectedVal.filter(item => item).join('*')
        val.disabled = !pathMap[key]
      })
    })
    // console.log(pathMap);
  }

  export default {
    name: 'GoodsSku',
    props: {
      goods: {
        type: Object,
        default: () => ({ specs: [], skus: [] })
      },
      skuId: {
        type: String,
      }
    },
    setup(props, { emit }) {
      //获得字典对象
      const pathMap = getPathMap(props.goods.skus)
      //默认选中
      initDefaultSelected(props.goods, props.skuId)
      //初始化禁用状态
      updateDisabledStatus(props.goods.specs, pathMap)

      //选中与取消选中逻辑 selected前段加上去
      const clickSpecs = (item, val) => {
        //按钮禁用不能点击
        if (val.disabled) return
        //选中/取消选中
        if (val.selected) {
          val.selected = false
        } else {
          item.values.forEach(bv => { bv.selected = false })
          val.selected = true
        }
        updateDisabledStatus(props.goods.specs, pathMap)
        // 触发change事件将sku数据传递出去
        const selectedArr = getSelectedValues(props.goods.specs).filter(v => v) //过滤掉undefined
        //已选的长度==sepcs的长度
        if (selectedArr.length === props.goods.specs.length) {
          const skuIds = pathMap[selectedArr.join('*')]
          const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
          // 传递
          emit('change', {
            skuId: sku.id,
            price: sku.price,
            oldPrice: sku.oldPrice,
            inventory: sku.inventory,
            specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').replace(' ', '')
          })
        } else {
          //没选完整
          emit('change', {})
        }
      }
      return { clickSpecs }
    }
  }
</script>
<style scoped lang="less">
  .sku-state-mixin () {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
      border-color: @xtxColor;
    }

    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }

  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        flex: 1;
        color: #666;

        >img {
          width: 50px;
          height: 50px;
          .sku-state-mixin ();
        }

        >span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          .sku-state-mixin ();
        }
      }
    }
  }
</style>
