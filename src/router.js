import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 挂载路由导航
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数 表示放行
  //next()放行 next('/login) 强制跳转
  // 如果用户访问的是登录页 直接放行
  if (to.path === '/login') return next()
  // 从sessionStorage 中获取保存到的token 值
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token 强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})
export default router
