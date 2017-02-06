<template>
    <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <ul class="nav navbar-nav navbar-right">
            <li><a v-link="{path:'/'}">主页</a></li>
            <li v-if='!isLogin'><a v-link="{path:'/login'}">登录</a></li>
            <template v-if='isLogin'>
                <li><a>Welcome {{user}} !</a></li>
                <li><a v-link="{path:'/login'}" @click="logout()">注销</a></li>
            </template>
        </ul>
    </div>
    </nav>
</template>

<script>
    export default{
        props: {
            isLogin:{
                type: Boolean
            },
            user:{
                type: String
            }
        },
        methods: {
            logout(){
                this.isLogin = false
                this.$dispatch('change-islogin', this.isLogin)
            },
        }
    }
</script>

<style>
    .navbar-default{
        background-color: initial;
    }
    .navbar-right{
        float: right!important;
        margin-right: -15px;
    }
    .navbar-nav>li{
        float: left;
    }
</style>