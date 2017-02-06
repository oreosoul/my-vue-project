<template>
	<div class="gray-bg gray-bgs">
		<div class="middle-box text-center loginscreen  animated fadeInDown">
			<div>
				<h1 class="logo-name" style="text-align: center;"> 
					<img src="../../assets/logo.png" alt="" width="120px"/>
				</h1>
                <p>欢迎{{name}}，以下是待办事项</p>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="请输入待办事项" required="" v-model="todos" @keyup.enter="addTodos">
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
                    <div v-show='!Done'>
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
                    <div v-show='Done' class="none-todo">
                        暂无待办事项
                    </div>
                </div>
                <div v-show='num===1'>
                    <div v-if='!Undo'>
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
                    <div v-if='!Remove'>
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
    export default {
		data() {
			return {
                name: 'Cheuk',
				todos: '',
                //* 事件list status：未完成0，完成1，删除2*//
                list: [
                    {status:0,content:'1'},
                    {status:1,content:'2'},
                    {status:0,content:'3'},
                    {status:2,content:'4'},
                ],
                count: 0,
                num: 0,
                options: ['待办事项','完成事项','回收站'],
			}
		},
        computed: {
            Done(){
                let count = 0;
                let length = this.list.length;
                for(let i in this.list){
                    this.list[i].status === 1||this.list[i].status === 2 ? count += 1 : '';
                }
                this.count = count;
                if(length===0||count===length){
                    return true;
                }else{
                    return false;
                }
            },
            Undo(){
                let count = 0;
                let length = this.list.length;
                for(let i in this.list){
                    this.list[i].status === 0||this.list[i].status === 2 ? count += 1 : '';
                }
                if(length===0||count===length){
                    return true;
                }else{
                    return false;
                }
            },
            Remove(){
                let count = 0;
                let length = this.list.length;
                for(let i in this.list){
                    this.list[i].status === 0||this.list[i].status === 1 ? count += 1 : '';
                }
                if(length===0||count===length){
                    return true;
                }else{
                    return false;
                }
            },
        },
		methods:{
            addTodos(){
                if(this.todos===''){
                    return
                }
                let obj = {
                    status: 0,
                    content: this.todos
                }
                this.list.push(obj);
                this.todos = '';
            },
            finishTodo(index){
                var list = this.list;
                list[index].status = 1;
                this.list = list;
                // this.$set(this.list,'status',true);
            },
            removeTodo(index){
                var list = this.list;
                list[index].status = 2;
                this.list = list;
            },
            deleteTodo(index){
                this.list.splice(index,1);
            },
            unfinishTodo(index){
                var list = this.list;
                list[index].status = 0;
                this.list = list;
                // this.$set(this.list[index],'status',false);
            },
            changeNum(index){
                this.num=index;
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
