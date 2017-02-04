import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
var router = new VueRouter()

//配置路由
router.map({
  '/': {
    name: "login",
    component: resolve => require(['./components/view/Login'],resolve)
  },
  '/main': {
    component: resolve => require(['./components/main/main'],resolve)
  },
})

//挂载到#app
router.start(App,"#app")

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

router.redirect({
  '*': '/main'
})
