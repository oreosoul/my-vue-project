<template>
  <div class="pages">
    <v-nav :user='user' :is-login='isLogin'></v-nav>
    <router-view :user='user'></router-view>
  </div>
</template>

<script>
  import store from './components/vuex/store'
  import Nav from './components/component/nav'
  export default{
    data() {
      return{
        user: '',
        list: [],
        isLogin: false,
      }
    },
    store: store,
    events:{
      'user-islogin': function (isLogin,name) {
        this.isLogin=isLogin
        this.user = name
      },
      'change-islogin': function (isLogin) {
        this.isLogin=isLogin
      },
    },
    components: {
      'v-nav': Nav,
    },
  }
</script>

<style>
  ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .pages{
    padding-top: 50px;
  }
</style>
