// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import Swiper from './swiper.vue'
import XtxMore from './xtx-more.vue' //查看更多
import XtxCheckbox from './xtx-checkbox.vue'
import XtxInfiniteLoading from './xtx-infinite-loading'
const importFn = require.context('./', false, /\.vue$/)
export default {
  install(app) {
    // 批量注册全局组件
    importFn.keys().forEach(key => { //'./xtx-skeleton.vue'
      // 导入组件
      const component = importFn(key).default
      console.log("component", component);
      // 注册组件
      app.component(component.name, component)
    })
    defineDirective(app) //图片懒加载
  }
}

import defaultImg from '@/assets/images/200.png'

// 指令
const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    mounted(el, binding) {
      //懒加载函数
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          //进入可是区内关闭懒加载任务
          observer.unobserve(el)
          //加载图片出错
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      //移出后重新开启
      observer.observe(el)
    }
  })
}
