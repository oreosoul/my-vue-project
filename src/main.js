import Vue from 'vue'
import App from './App'
import iView from 'iview'
import VueRouter from 'vue-router'
import store from './components/vuex/store'
import 'iview/dist/styles/iview.css';
Vue.use(iView)
Vue.use(VueRouter)
var router = new VueRouter()

//配置路由
router.map({
  '/': {
    name: "main",
    component: resolve => require(['./components/main/main'],resolve)
  },
  '/login': {
    name: "login",
    component: resolve => require(['./components/view/Login'],resolve)
  },
})

//挂载到#app
router.start(App,"#app")

/* eslint-disable no-new */
new Vue({
  el: 'body',
  store,
  components: { App }
})

router.redirect({
  '*': '/main'
})
