import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '@/styles/index.scss' // global css

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import Verify from '@/components/verify'
import Login from '@/components/common/globalLogin'
import { Message, Notification } from 'element-ui'

Vue.use(ElementUI)

// 验证码
Vue.prototype.$verify = Verify
// 登录框
Vue.prototype.$login = Login

// // 没有登录信息，防止下次也获取信息
let preventGetInfo = false

// 路由发生变化修改页面title
NProgress.configure({ showSpinner: false }) // NProgress Configuration
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  if (to.meta.title) {
    const name = '在线教育平台'
    document.title = to.meta.title + ' | ' + name
  }
  const isLogin = store.getters.user !== null && Object.keys(store.getters.user).length !== 0
  if (preventGetInfo || isLogin) {
    next()
  } else {
    await store.dispatch('user/getInfo').then(() => {
      next()
    }).catch(() => {
      preventGetInfo = true
      next()
    })
  }
  // 关闭消息提示
  Message.closeAll()
  Notification.closeAll()
})
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use(vm)
