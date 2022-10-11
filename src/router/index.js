import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  //一级路由
  path: '/',
  component: () => import('@/views/layout.vue'),
  redirect: 'home',
  //二级路由
  children: [{
      name: '',
      path: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      name: '一级分类',
      path: 'category/:id',
      component: () => import('@/views/home/component/category.vue')
    },
    {
      name: '二级分类',
      path: 'category/sub/:id',
      component: () => import('@/views/home/component/sub.vue')
    },
  ]
}, ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
