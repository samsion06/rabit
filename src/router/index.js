import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
    //一级路由
    path: '/',
    name: '首页',
    component: () => import('@/views/layout.vue'),
    //二级路由
    children: [{
        name: '首页',
        path: '/',
        component: () => import('@/views/home/index.vue')
      },
      {
        name: '一级分类',
        path: 'category/:id',
        component: () => import('@/views/cateogry/index.vue')
      },
      {
        name: '二级分类',
        path: 'category/sub/:id',
        component: () => import('@/views/cateogry/sub.vue')
      },
    ]
  },
  {
    name: '测试',
    path: '/test',
    component: () => import('@/test/test.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  //切换路由地址的时候，返回到顶部
  scrollBehavior() {
    return { left: 0, top: 0 } 
  }




})

export default router
