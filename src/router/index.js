import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
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
        name: '一级分类页面',
        path: 'category/:id',
        component: () => import('@/views/cateogry/index.vue')
      },
      {
        name: '二级分类页面',
        path: 'category/sub/:id',
        component: () => import('@/views/cateogry/sub.vue')
      },
      {
        name: '商品详情',
        path: 'product/:id',
        component: () => import('@/views/goods/index.vue')
      },
      {
        name: '购物车',
        path: 'cart',
        component: () => import('@/views/cart/index.vue')
      },
      {
        name: '结算支付',
        path: '/member/checkout',
        component: () => import('@/views/member/pay/checkout')
      },
      {
        name: '支付页面',
        path: '/member/pay',
        component: () => import('@/views/member/pay/index')
      },
      {
        name: '支付成功',
        path: '/pay/callback',
        component: () => import('@/views/member/pay/result')
      },
      {
        name: '个人中心',
        path: '/member',
        component: () => import('@/views/member/layout.vue'),
        children: [{
            path: '/member',
            component: () => import('@/views/member/home/index.vue'),
          },
          {
            path: 'order',
            component: () => import('@/views/member/order/index.vue'),
          }
        ]
      },

    ]
  },
  {
    name: '测试',
    path: '/test',
    component: () => import('@/test/test.vue')
  },
  {
    name: '登录',
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  // {
  //   name: '登录',
  //   path: '/login/callback',
  //   component: () => import('@/views/login/callback.vue')
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  //切换路由地址的时候，返回到顶部
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router
