<template>
	<div class="gray-bg gray-bgs">
		<div class="middle-box text-center loginscreen  animated fadeInDown">
			<div>
				<h1 class="logo-name" style="text-align: center;"> 
					<img src="../../assets/logo.png" alt="" width="120px"/>
				</h1>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="用户名" required="" v-model="username">
			</div>
			<div class="form-group">
				<input type="password" class="form-control" placeholder="密码" required="" v-model='password' @keyup.enter='login'>
			</div>
			<a class="btn btn-primary full-width" @click='login' style="color: #FFFFFF;">登 录</a>
		</div>
	</div>
</template>

<script>
	import store from '../vuex/store'
	import {isLogin} from '../vuex/getter'
	import {loginAction} from '../vuex/action'
	import data from '../../assets/json/data.json'
    export default{
        data() {
            return{
                username: '', //用户名
				password: '', //密码
				isLogin: false,
            }
        },
		props: {
        },
		methods: {
			login() {
				if(this.username === '' || this.password === '') {
					this.$Message.warning('账号或密码不能为空！')
				} else {
					for(let i in data.users){
						if(data.users[i].username===this.username){
							if(data.users[i].password===this.password){
								let list = data.users[i].list
								this.loginAction(this.username,list)
								this.$route.router.go({path: '/'})
								this.$Message.success('登陆成功')
								return;
							}else{
								this.$Message.error ('密码错误')
								return;
							}
						}
					}
					this.$Message.error ('用户不存在')
				}
			}
		},
		store: store,
		vuex :{
			actions: {
				loginAction
			},
			getter: {
				isLogin,
			},
		},
    }
</script>
<style>
	.gray-bgs {
		height: 100%;
		max-width: 320px;
		margin: 0 auto;
	}
	.full-width{
		width: 100%;
	}
</style>