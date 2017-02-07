<template>
	<div class="gray-bg gray-bgs">
		<div class="middle-box text-center loginscreen  animated fadeInDown">
			<div>
				<h1 class="logo-name" style="text-align: center;"> 
					<img src="../../assets/logo.png" alt="" width="120px"/>
				</h1>
                <p>
                    <span v-if="!isLogin">游客请先<a v-link="{path:'/login'}">登录</a></span>
                    <span v-else>欢迎{{user}}</span>，以下是待办事项
                </p>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="请输入待办事项" required="" v-model="todos" @keyup.enter="addTodos(todos)">
                </div>
                <div class="btn-container">
                    <div>
                        <a class="btn btn-todo" :class="{active: $index===num}" @click="changeNum($index)" v-for="option in options">{{option}}</a>
                        <!--<a class="btn btn-todo" :class="{active: isTodoShow}" @click="todoShow">待办事项</a>
                        <a class="btn btn-todo" :class="{active: !isTodoShow}" @click="doneShow">完成事项</a>
                        <a class="btn btn-todo" :class="{active: !isTodoShow}" @click="doneShow">回收站</a>-->
                    </div>
                </div>
                <div v-show='num===0'>
                    <div v-if='Undo'>
                        <ul class="todo-list">
                            <template v-for="todo in list">
                                <li v-if="todo.status==0">
                                    <span class='todo-name'>{{$index + 1}}.{{todo.content}}</span>
                                    <span class='todo-btn'>
                                        <button class="btn btn-primary btn-sm" @click="finishTodo($index)">完成</button>
                                        <button class="btn btn-danger btn-sm" @click="removeTodo($index)">移除</button>
                                    </span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div v-else class="none-todo">
                        暂无待办事项
                    </div>
                </div>
                <div v-show='num===1'>
                    <div v-if='Done'>
                        <ul class="todo-list">
                            <template v-for="todo in list">
                                <li v-if="todo.status==1">
                                    <span class='todo-name'>{{$index + 1}}.{{todo.content}}</span>
                                    <span class='todo-btn'>
                                        <button class="btn btn-primary btn-sm" @click="unfinishTodo($index)">还原</button>
                                        <button class="btn btn-danger btn-sm" @click="removeTodo($index)">移除</button>
                                    </span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div v-else  class="none-todo">
                        暂无完成事项
                    </div>
                </div>
                <div v-show='num===2'>
                    <div v-if='Remove'>
                        <ul class="todo-list">
                            <template v-for="todo in list">
                                <li v-if="todo.status==2">
                                    <span class='todo-name'>{{$index + 1}}.{{todo.content}}</span>
                                    <span class='todo-btn'>
                                        <button class="btn btn-primary btn-sm" @click="unfinishTodo($index)">还原</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteTodo($index)">删除</button>
                                    </span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div v-else  class="none-todo">
                        回收站为空
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../vuex/store'
    import {user,
            list
    } from '../vuex/getter'
    import {addTodos,
            finishTodo,
            removeTodo,
            deleteTodo,
            unfinishTodo
    } from '../vuex/action'
    export default {
		data() {
			return {
				todos: '',
                //* 事件list status：未完成0，完成1，删除2*//
                num: 0,
                options: ['待办事项','完成事项','回收站'],
			}
		},
        props: {
            user:{
                type:String
            },
        },
        computed: {
            Undo(){
                let count = 0;
                let length = this.list.length;
                for(let i in this.list){
                    this.list[i].status === 0 ? count += 1 : '';
                }
                if(count===0){
                    return false;
                }else{
                    return true;
                }
            },
            Done(){
                let count = 0;
                let length = this.list.length;
                for(let i in this.list){
                    this.list[i].status === 1 ? count += 1 : '';
                }
                if(count===0){
                    return false;
                }else{
                    return true;
                }
            },
            Remove(){
                let count = 0;
                let length = this.list.length;
                for(let i in this.list){
                    this.list[i].status === 2 ? count += 1 : '';
                }
                if(count===0){
                    return false;
                }else{
                    return true;
                }
            },
        },
		methods:{
            changeNum(index){
                this.num=index;
            }
		},
        store: store,
        vuex:{
            actions: {
                addTodos,
                finishTodo,
                removeTodo,
                deleteTodo,
                unfinishTodo,
            },
            getters: {
                user,
                list,
            }
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
    .btn-container{
        position: relative;
        border: 0;
        border-bottom: 2px #bbb solid;
    }
    .btn-container>div{
        position: relative;
        left: 0%;
        bottom: -2px;
    }
    .btn-todo{
        border: 0;
        border-radius: 0;
        color: #bbb;
    }
    .btn-todo:active{
        box-shadow:none;
        -webkit-box-shadow:none;
    }
    .btn-todo.active{
        color: #333;
        border-bottom: 2px #1ab394 solid;
        box-shadow:none;
        -webkit-box-shadow:none;
    }
    .todo-list li{
        overflow: hidden;
        height: 31px;
        box-sizing: content-box;
        padding: 10px;
        border-bottom: 1px #bbb solid;
    }
     .todo-list li .todo-name{
        display:block;
        float: left;
        font-size: 14px;
        height: 100%;
        line-height: 30px
     }
     .todo-list li .todo-btn{
        float: right;
        height: 100%;
     }
     .none-todo{
         padding: 10px;
     }
</style>
