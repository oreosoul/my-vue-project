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
                        <a class="btn btn-todo" :class="{active: isTodoShow}" @click="todoShow">待办事项</a>
                        <a class="btn btn-todo" :class="{active: !isTodoShow}" @click="doneShow">完成事项</a>
                    </div>
                </div>
                <div v-show='isTodoShow'>
                    <div v-show='!Done'>
                        <ul class="todo-list">
                            <template v-for="todo in list">
                                <li v-if="todo.status==false">
                                    <span class='todo-name'>{{$index + 1}}.{{todo.content}}</span>
                                    <span class='todo-btn'>
                                        <button class="btn btn-primary btn-sm" @click="finishTodo($index)">完成</button>
                                        <button class="btn btn-danger btn-sm" @click="deleteTodo()">删除</button>
                                    </span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div v-show='Done' class="none-todo">
                        暂无待办事项
                    </div>
                </div>
                <div v-show='!isTodoShow'>
                    <div v-if='count > 0'>
                        <ul class="todo-list">
                            <template v-for="todo in list">
                                <li v-if="todo.status==true">
                                    <span class='todo-name'>{{$index + 1}}.{{todo.content}}</span>
                                    <span class='todo-btn'>
                                        <button class="btn btn-primary btn-sm" @click="unfinishTodo($index)">还原</button>
                                    </span>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div v-else  class="none-todo">
                        暂无完成事项
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
                list: [
                    {status:false,content:'1'},
                    {status:true,content:'2'},
                ],
                count: 0,
                isTodoShow: true,
			}
		},
        computed: {
            Done(){
                let count = 0;
                let length = this.list.length;
                for(let i in this.list){
                    this.list[i].status === true ? count += 1 : '';
                }
                this.count = count;
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
                    status: false,//fasle代表未完成
                    content: this.todos
                }
                this.list.push(obj);
                this.todos = '';
            },
            todoShow(){
                this.isTodoShow = true;
            },
            doneShow(){
                this.isTodoShow = false;
            },
            finishTodo(index){
                var list = this.list;
                list[index].status = true;
                this.list = list;
                // this.$set(this.list,'status',true);
            },
            deleteTodo(index){
                this.list.splice(index,1);
            },
            unfinishTodo(index){
                var list = this.list;
                list[index].status = false;
                this.list = list;
                // this.$set(this.list[index],'status',false);
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
